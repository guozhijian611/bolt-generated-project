export function paroli(currentBet, result) {
      let nextBet = currentBet;
      let profit = 0;

      if (result === 'win') {
        profit = currentBet;
        nextBet = currentBet * 2;
      } else {
        profit = -currentBet;
        nextBet = 1;
      }

      return {
        bet: currentBet,
        nextBet: nextBet,
        profit: profit
      };
    }
