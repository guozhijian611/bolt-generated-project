export function labouchere(currentBet, result, sequence) {
      let nextBet = currentBet;
      let profit = 0;

      if (sequence.length === 0) {
        return {
          bet: 0,
          nextBet: 0,
          profit: 0,
          sequence: []
        };
      }

      if (result === 'win') {
        profit = currentBet;
        if (sequence.length > 1) {
          sequence.shift();
          sequence.pop();
        } else {
          sequence = [];
        }
        nextBet = sequence.length > 1 ? sequence[0] + sequence[sequence.length - 1] : sequence[0] || 0;
      } else {
        profit = -currentBet;
        sequence.push(currentBet);
        nextBet = sequence.length > 1 ? sequence[0] + sequence[sequence.length - 1] : sequence[0] || 0;
      }

      return {
        bet: currentBet,
        nextBet: nextBet,
        profit: profit,
        sequence: sequence
      };
    }
