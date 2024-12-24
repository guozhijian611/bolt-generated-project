export function oneThreeTwoSix(currentBet, result, step = 0) {
      let nextBet = currentBet;
      let profit = 0;
      const sequence = [1, 3, 2, 6];

      if (result === 'win') {
        profit = currentBet;
        step = (step + 1) % 4;
        nextBet = currentBet * sequence[step];
      } else {
        profit = -currentBet;
        nextBet = currentBet;
        step = 0;
      }

      return {
        bet: currentBet,
        nextBet: nextBet,
        profit: profit,
        step: step
      };
    }
