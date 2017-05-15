package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/handlers"
)

func isJSON(b []byte) bool {
	var js interface{}
	return json.Unmarshal(b, &js) == nil
}

func logResHandler(w http.ResponseWriter, r *http.Request, stmtIns *sql.Stmt) {
	referer := r.Referer()
	u, err := url.Parse(referer)
	if err != nil {
		http.NotFound(w, r)
		return
	}
	if !(u.Host == "zeitgeist-borders.antonomase.fr" || u.Host == "www.zeitgeist-borders.antonomase.fr" || u.Host == "zb.antonomase.fr" || u.Host == "www.zb.antonomase.fr" || u.Scheme == "https") {
		http.NotFound(w, r)
		return
	}

	contentLen, err := strconv.Atoi(r.Header.Get("Content-Length"))
	if err != nil {
		fmt.Println("Content-Length is not an int !")
		http.NotFound(w, r)
		return
	}
	if contentLen > 100000 {
		fmt.Println("Content-Length is not large : ", contentLen)
		http.NotFound(w, r)
		return
	}
	rawRes, readErr := ioutil.ReadAll(r.Body)
	if readErr != nil {
		fmt.Println(readErr)
		http.NotFound(w, r)
		return
	}
	actualContentLen := len(rawRes)
	if contentLen != actualContentLen {
		fmt.Println("Content-length doesn't match actual size", contentLen, actualContentLen)
		http.NotFound(w, r)
		return
	}

	if !isJSON(rawRes) {
		fmt.Println("Not JSON !")
		return
	}

	_, insErr := stmtIns.Exec(r.RemoteAddr, rawRes)
	if insErr != nil {
		fmt.Println(insErr)
		return
	}
	return

}

func main() {
	db, dbErr := sql.Open("mysql", "")
	if dbErr != nil {
		fmt.Println(dbErr)
		return
	}
	defer db.Close()

	stmtIns, stErr := db.Prepare("INSERT INTO users_results (ip, res) VALUES( ?, ? )")
	if stErr != nil {
		fmt.Println(stErr)
		return
	}
	defer stmtIns.Close()

	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		logResHandler(w, r, stmtIns)
	})

	http.Handle("/", http.FileServer(http.Dir("./www")))

	listenErr := http.ListenAndServeTLS(":443",
		"/path/to/fullchain.pem",
		"/path/to/privkey.pem",
		handlers.LoggingHandler(os.Stdout, handlers.CompressHandler(http.DefaultServeMux)))
	log.Fatal(listenErr)
}
