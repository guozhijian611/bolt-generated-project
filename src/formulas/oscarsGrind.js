export function oscarsGrind(currentBet, result, profit, unit) {
      let nextBet = currentBet;
      let currentProfit = profit;
      let currentUnit = unit;

      if (result === 'win') {
        currentProfit += currentBet;
        if (currentProfit > 0) {
          currentUnit = 1;
        }
        nextBet = currentBet + currentUnit;
      } else {
        currentProfit -= currentBet
        nextBet = currentBet;
      }

      return {
        bet: currentBet,
        nextBet: nextBet,
        profit: currentProfit,
        unit: currentUnit
      };
    }
