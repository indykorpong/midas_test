"use strict";
function getQuestionPart(phrases) {
    // get the longest contiguous string that is a substring of all phrases
    let longestSubstring = "";
    for (let i = 0; i < phrases[0].length; i++) {
        for (let j = i + 1; j <= phrases[0].length; j++) {
            const substring = phrases[0].substring(i, j);
            if (phrases.every((phrase) => phrase.includes(substring))) {
                if (substring.length > longestSubstring.length) {
                    longestSubstring = substring;
                }
            }
        }
    }
    // remove the longest substring from all phrases
    const newPhrases = phrases.map((phrase) => phrase.replace(longestSubstring, "").trim());
    return newPhrases;
}
