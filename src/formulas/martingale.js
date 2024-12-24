export function martingale(currentBet, result) {
      let nextBet = currentBet;
      let profit = 0;

      if (result === 'win') {
        profit = currentBet;
        nextBet = 1;
      } else {
        profit = -currentBet;
        nextBet = currentBet * 2;
      }

      return {
        bet: currentBet,
        nextBet: nextBet,
        profit: profit
      };
    }
