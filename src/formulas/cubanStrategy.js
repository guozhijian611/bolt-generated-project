export function cubanStrategy(currentBet, result, baseBet, lossCount) {
      let nextBet = currentBet;
      let profit = 0;

      if (result === 'win') {
        profit = currentBet;
        nextBet = baseBet;
      } else {
        profit = -currentBet;
        nextBet = lossCount >= 2 ? baseBet * 3 : baseBet;
      }

      return {
        bet: currentBet,
        nextBet: nextBet,
        profit: profit
      };
    }
