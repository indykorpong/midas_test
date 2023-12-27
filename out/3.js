"use strict";
function quickestPath(board) {
    // return array of roll results that reach 100 in the quickest possible way.
    const dp = Array(101).fill(Infinity);
    dp[1] = 0;
    const times = board.snakes.length < board.ladders.length
        ? board.snakes.length + 1
        : board.ladders.length;
    for (let t = 0; t < times; t++) {
        for (let i = 2; i < 101; i++) {
            for (let j = 1; j <= 6; j++) {
                if (i - j >= 0) {
                    dp[i] = Math.min(dp[i], dp[i - j] + 1);
                    const jumpTo = board.ladders.find(([start, end]) => start === i);
                    if (jumpTo) {
                        dp[jumpTo[1]] = Math.min(dp[jumpTo[1]], dp[i]);
                        dp[i] = Infinity;
                    }
                    const fallTo = board.snakes.find(([start, end]) => start === i);
                    if (fallTo) {
                        dp[fallTo[1]] = Math.min(dp[fallTo[1]], dp[i]);
                        dp[i] = Infinity;
                    }
                }
            }
        }
    }
    const answer = [];
    let i = 100;
    let stepCount = dp[i];
    while (i > 1) {
        for (let j = 1; j <= 6; j++) {
            if (i - j >= 1 && dp[i - j] != Infinity && dp[i - j] === stepCount - 1) {
                answer.push(j);
                i -= j;
                const jumpTo = board.ladders.find(([start, end]) => end === i);
                if (jumpTo) {
                    i = jumpTo[0];
                }
                const fallTo = board.snakes.find(([start, end]) => end === i);
                if (fallTo) {
                    i = fallTo[0];
                }
                stepCount--;
                break;
            }
        }
    }
    return answer.reverse();
}
