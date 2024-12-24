export function kent(currentBet, result, baseBet, unit) {
      let nextBet = currentBet;
      let profit = 0;
      let currentUnit = unit;

      if (result === 'win') {
        profit = currentBet;
        currentUnit++;
        nextBet = baseBet * currentUnit;
      } else {
        profit = -currentBet;
        currentUnit = currentUnit > 1 ? currentUnit - 1 : 1;
        nextBet = baseBet * currentUnit;
      }

      return {
        bet: currentBet,
        nextBet: nextBet,
        profit: profit,
        unit: currentUnit
      };
    }
