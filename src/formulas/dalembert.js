export function dalembert(currentBet, result) {
      let nextBet = currentBet;
      let profit = 0;

      if (result === 'win') {
        profit = currentBet;
        nextBet = currentBet - 1 > 0 ? currentBet - 1 : 1;
      } else {
        profit = -currentBet;
        nextBet = currentBet + 1;
      }

      return {
        bet: currentBet,
        nextBet: nextBet,
        profit: profit
      };
    }
