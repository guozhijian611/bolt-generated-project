export function flatBetting(currentBet, result) {
      let nextBet = currentBet;
      let profit = 0;

      if (result === 'win') {
        profit = currentBet;
      } else {
        profit = -currentBet;
      }

      return {
        bet: currentBet,
        nextBet: nextBet,
        profit: profit
      };
    }
