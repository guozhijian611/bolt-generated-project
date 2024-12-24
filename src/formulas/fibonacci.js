export function fibonacci(currentBet, result, lastBet = 1, secondLastBet = 0) {
      let nextBet = currentBet;
      let profit = 0;

      if (result === 'win') {
        profit = currentBet;
        nextBet = lastBet;
      } else {
        profit = -currentBet;
        nextBet = lastBet + secondLastBet;
      }

      return {
        bet: currentBet,
        nextBet: nextBet,
        profit: profit
      };
    }
