/*
Google Borders v.2
by Antoine Mazières
*/

var apiUrl = "https://suggestqueries.google.com/complete/search?callback=?"
// var hls = ["fr", "es", "de"]
var hls = ['sv', 'da', 'lt', 'de', 'hr', 'et', 'ar', 'ru', 'mg', 'ro', 'vi', 'is', 'pt-PT', 'sl', 'tr', 'lv', 'hu', 'th', 'rw', 'sw', 'it', 'fi', 'ms', 'hi', 'ca', 'ko', 'pl', 'id', 'bg', 'ti', 'nl', 'sk', 'el', 'uk', 'ja', 'cs', 'sr', 'zh-TW', 'ta', 'pt-BR', 'iw', 'zh-CN', 'ch', 'fil', 'fr', 'en', 'es', 'no']
var nb_hls = hls.length

function mkAllQueries(query) {
    // (TODO) clean events before
    var allRes = {}
    var promises = []
    for (var i = 0; i < nb_hls; i++){
        promises.push($.getJSON(apiUrl, {
            "client": "firefox",
            "hl": hls[i],
            "q": query
        })
            .done(function (hl, q) {
                return function (data) {
                    allRes[hl] = data
                }
            }(hls[i], query, allRes))

            .fail(function (hl, q) {
                return function (error) {
                  if (error.status == 404){
                    allRes[hl] = "403"
                  }
                }
              }(hls[i], query, allRes))

            // .always(function () {
            //     console.log("Completed.")
            // })
        )
    }
    $.when.apply($, promises)
        .done(function (data) {
            allRes = formatRes(allRes)
            goorders(allRes)
        })
        .fail(function (error) {
            // console.log(error)
            $(".glyphicon-random[rel=tooltip]").tooltip("hide");
            $(".glyphicon-search[rel=tooltip]").tooltip("hide");
            $('#googleThres').modal('show')
        })
        // .always(function () {
        //     console.log("AllCompleted.")
        // })
}

function formatRes(allRes) {
  $( "#rawData" ).attr("href", "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allRes, null, 2)))
  $( "#rawData" ).attr("download", "raw.json")
  $.ajax({
    url: 'https://zeitgeist-borders.antonomase.fr/api',
    type: 'POST',
    async: true,
    data: JSON.stringify(allRes),
  });
  delete allRes.ca
  delete allRes.ch
  for (var k in allRes) {
    if (allRes[k][1].length == 0) {
      allRes[k][1].push('No suggestions... <a data-toggle="modal" data-target="#whyNoSuggestions">(<b>?</b>)</a>')
    }
    if (allRes[k][1].length > 3) {
      var resSlice = allRes[k][1].slice(0,3)
      allRes[k][1] = resSlice
    }
  }
  return allRes
}

function sortCounter(counter) {
    var keysSorted = Object.keys(counter).sort(function(a,b){return counter[a]-counter[b]})
    var sortedCounter = []
    for (var i = keysSorted.length - 1; i >= 0; i--) {
        sortedCounter.push([keysSorted[i], counter[keysSorted[i]]])
    }
    return sortedCounter
}

function sortSuggestions(allRes) {
    var counter = {}
    for (var k in allRes) {
        var allSuggestions = allRes[k][1]
        var nbSuggestions = allSuggestions.length
        for (var i = 0; i < nbSuggestions; i++) {
            if (i > 2) {
              break
            }
            var suggestion = allSuggestions[i]
            // var suggestionWeight = (nbSuggestions - i) / nbSuggestions
            var suggestionWeight = 3 - i
            if (counter[suggestion] == undefined) {
                counter[suggestion]  = suggestionWeight
            } else {
                counter[suggestion] += suggestionWeight
            }
        }
    }
    return sortCounter(counter)
}

function suggestionsToHls (allRes) {
    var suggestionsHls = {}
    for (var hl in allRes) {
        suggestions = allRes[hl][1]
        for (var i = suggestions.length - 1; i >= 0; i--) {
            if (!suggestionsHls.hasOwnProperty(suggestions[i])) {
                suggestionsHls[suggestions[i]] = {}
            }
            suggestionsHls[suggestions[i]][hl] = suggestions.length - i
        }
    }
    return suggestionsHls
}

var rankToColor = {
  0: "#581845",
  1: "#c70039",
  2: "#ffc300"
}

function initSuggestions(suggestionsSortedCounter, suggestionsHls, allRes) {
    $("#suggestionsRanking").empty()
    for (var i = 0; i < suggestionsSortedCounter.length; i++) {
        var suggest = suggestionsSortedCounter[i][0]
        var weight = suggestionsSortedCounter[i][1]
        var thisHls = Object.keys(suggestionsHls[suggest])
        $("#suggestionsRanking").append(
            '<tr class="suggestionLine ' + thisHls.join(" ") + '"><td id="suggest-' + i + '" style="font-size:12px">' + suggest + "</td>" +
            '<td style="float:right"><small><i>' + weight + "</i></small></td></tr>"
        )
        $( "#suggest-" + i)
            .mouseenter(function (hlArr, s) {
                return function () {
                    hlArr.forEach(function (hl) {
                        rank = allRes[hl][1].indexOf(s)
                        $( "#langName-" + hl ).css('font-weight', 'bold')
                        $( "#langName-" + hl ).css('font-size', '11px')
                        hlToCountry[hl].countries.forEach(function (c) {
                            $( '#' + c.id ).css('fill', rankToColor[rank])
                        })
                    })
                }
            }(thisHls, suggest))
            .mouseleave(function (hlArr) {
                return function () {
                    hlArr.forEach(function (hl) {
                        $( "#langName-" + hl ).css('font-weight', 'normal')
                        $( "#langName-" + hl ).css('font-size', '10px')
                        hlToCountry[hl].countries.forEach(function (c) {
                            $( '#' + c.id ).css('fill', '#cccccc')
                            $( '#' + c.id ).css('fill-opacity', '0.7')
                        })
                    })
                }
            }(thisHls))
    }
}

function initLangName(allRes) {
    $( "#langList" ).empty()
    for (var hl in allRes) {
        $( "#langList" )
            // (TODO) strip the comma on last iter.
            .append('<div id="langName-' + hl + '" class="langName">'  + hlToCountry[hl].langName + ", </div>")
        $( "#langName-" + hl )
            .mouseenter(function (hlparam) {
                return function () {
                    $( this ).css('font-weight', 'bold')
                    $( this ).css('font-size', '11px')
                    hlToCountry[hlparam].countries.forEach( function (c) {
                        $( '#' + c.id ).css('fill', '#99ccff')
                        $( '#' + c.id ).css('fill-opacity', '1.0')
                    })
                    $( "#suggestionsRanking" ).hide()
                    for (var i = 0; i < allRes[hlparam][1].length; i++) {
                      var sug = allRes[hlparam][1][i]
                      var sugW = 3 - i
                      $("#languageSuggestionsRanking").append(
                        '<tr class="suggestionLine"><td style="font-size:12px">' + sug + '</td><td style="float:right"><small><i>' + sugW + '</i></small></td></tr>'
                      )
                    }
                }
            }(hl))
            .mouseleave(function (hlparam) {
                return function () {
                    $( this ).css('font-weight', 'normal')
                    $( this ).css('font-size', '10px')
                    hlToCountry[hlparam].countries.forEach( function (c) {
                        $( '#' + c.id ).css('fill', '#cccccc')
                        $( '#' + c.id ).css('fill-opacity', '0.7')
                    })
                    $( "#languageSuggestionsRanking" ).empty()
                    $( "#suggestionsRanking" ).show()
                }
            }(hl))
    }
}

function initMap (allRes) {
    $(".land").unbind()
    for (var hl in allRes) {
        hlToCountry[hl].countries.forEach(function (c) {
            $( "#" + c.id )
                .mouseenter(function (hlparam) {
                    return function () {
                        $( this ).css('fill', '#99ccff')
                        $( this ).css('fill-opacity', '1.0')
                        $( "#langName-" + hlparam ).css('font-weight', 'bold')
                        $( "#langName-" + hlparam ).css('font-size', '11px')
                        $( "#suggestionsRanking" ).hide()
                        for (var i = 0; i < allRes[hlparam][1].length; i++) {
                          var sug = allRes[hlparam][1][i]
                          var sugW = 3 - i
                          $("#languageSuggestionsRanking").append(
                            '<tr class="suggestionLine"><td style="font-size:12px">' + sug + '</td><td style="float:right"><small><i>' + sugW + '</i></small></td></tr>'
                          )
                        }
                    }
                }(hl))
                .mouseleave(function (hlparam) {
                    return function () {
                        $( this ).css('fill', '#cccccc')
                        $( this ).css('fill-opacity', '0.7')
                        $( "#langName-" + hlparam ).css('font-weight', 'normal')
                        $( "#langName-" + hlparam ).css('font-size', '10px')
                        $( "#languageSuggestionsRanking" ).empty()
                        $( "#suggestionsRanking" ).show()
                    }
                }(hl))
        })
    }
}

function goorders (allRes) {
    var suggestionsSortedCounter = sortSuggestions(allRes)
    var suggestionsHls = suggestionsToHls(allRes)
    initSuggestions(suggestionsSortedCounter, suggestionsHls, allRes)
    initLangName(allRes)
    initMap(allRes)
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var randomQueries = [
  "How to ",
  "Where to go ",
  "Why society ",
  "Why my cat ",
  "Why my dog ",
  "Why my wife ",
  "Why my husband ",
  "Why my boyfriend ",
  "Why my girlfriend ",
  "Who will ",
  "When will I ",
  "How to build ",
  "Why is ",
  "Why sex ",
  "Islam is ",
  "Christianism is ",
  "Judaism is ",
  "Buddhism is ",
  "Religion is ",
  "Politics is ",
  "Politicians are ",
  "Education is ",
  "Teachers are ",
  "NSA is ",
  "CIA is ",
  "Americans are ",
  "Frenchs are ",
  "Russians are ",
  "Elvis alive in ",
  "I want to learn ",
  "I lost my ",
  "Is it bad to ",
  "Is it good to ",
  "Is it weird to ",
  "Is it normal to ",
  "How to become "
]

swapRandomQueries = JSON.parse(JSON.stringify(randomQueries))

function getRandomQuery() {
  if (swapRandomQueries.length == 0) {
    swapRandomQueries = JSON.parse(JSON.stringify(randomQueries))
  }
  idx = Math.floor(Math.random()*swapRandomQueries.length)
  val = swapRandomQueries[idx]
  swapRandomQueries.splice(idx, 1)
  return val
}

jQuery( document ).ready(function( $ ) {
  $(".glyphicon-random[rel=tooltip]").tooltip({ placement: 'top'});
  $(".glyphicon-random[rel=tooltip]").tooltip("show");
  $(".glyphicon-search[rel=tooltip]").tooltip({ placement: 'bottom'});
  $(".glyphicon-search[rel=tooltip]").tooltip("show");
  $("#aboutClic").click(function () {
    $(".glyphicon-random[rel=tooltip]").tooltip("hide");
    $(".glyphicon-search[rel=tooltip]").tooltip("hide");
  })
  var userQuery = getUrlParameter("q")
  if (userQuery == null) {
    // userQuery = randomQueries[Math.floor(Math.random()*randomQueries.length)];
    userQuery = getRandomQuery();
    var newUrl = location.href.split('?')[0] + '?q=' + encodeURIComponent(userQuery)
    history.pushState('','', newUrl)
  }
  $( '#textInputForm' ).val(userQuery)
  var txtInput = document.getElementById('textInputForm');
  txtInput.focus();
  txtInput.select();
  mkAllQueries(userQuery)
  $( '#submit' ).click(function (event) {
      event.preventDefault()
      var queryRawString = $( '#textInputForm' ).val()
      var newUrl = location.href.split('?')[0] + '?q=' + encodeURIComponent(queryRawString)
      history.pushState('','', newUrl)
      var txtInput = document.getElementById('textInputForm');
      txtInput.focus();
      txtInput.select();
      mkAllQueries(queryRawString)
    })
  $( '#randomQueryGenerator' ).click(function (event) {
    // newQuery = randomQueries[Math.floor(Math.random()*randomQueries.length)]
    newQuery = getRandomQuery();
    newUrl = location.href.split('?')[0] + '?q=' + newQuery
    history.pushState('','', newUrl)
    $( '#textInputForm' ).val(newQuery)
    mkAllQueries(newQuery)
  })
})
