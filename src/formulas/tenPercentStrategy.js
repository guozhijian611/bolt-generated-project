export function tenPercentStrategy(currentBet, result, balance) {
      let nextBet = Math.max(1, Math.round((balance + currentBet) * 0.1));
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
