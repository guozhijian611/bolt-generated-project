import { martingale } from './formulas/martingale.js';
    import { fibonacci } from './formulas/fibonacci.js';
    import { paroli } from './formulas/paroli.js';
    import { dalembert } from './formulas/dalembert.js';
    import { oneThreeTwoSix } from './formulas/oneThreeTwoSix.js';
    import { labouchere } from './formulas/labouchere.js';
    import { oscarsGrind } from './formulas/oscarsGrind.js';
    import { reverseMartingale } from './formulas/reverseMartingale.js';
    import { flatBetting } from './formulas/flatBetting.js';
    import { kent } from './formulas/kent.js';
    import { monteCarlo } from './formulas/monteCarlo.js';
    import { cubanStrategy } from './formulas/cubanStrategy.js';
    import { tenPercentStrategy } from './formulas/tenPercentStrategy.js';
    import Chart from 'chart.js/auto';

    const baseBetInput = document.getElementById('baseBet');
    const maxRoundsInput = document.getElementById('maxRounds');
    const formulaSelect = document.getElementById('formula');
    const startBtn = document.getElementById('startBtn');
    const resultsTableBody = document.querySelector('#resultsTable tbody');
    const formulaDescriptionDiv = document.getElementById('formulaDescription');
    const balanceChartCanvas = document.getElementById('balanceChart');
    const winRateDiv = document.getElementById('winRate');

    let balanceChart;

    const formulaDescriptions = {
      martingale: "马丁格尔策略：每次输都将赌注翻倍，赢了则回到基础赌注。风险较高，但理论上可以快速回本。",
      fibonacci: "斐波那契策略：使用斐波那契数列来决定每次的赌注。数列为 1, 1, 2, 3, 5, 8, ...，每次输都增加赌注，赢了则回到前两个赌注。",
      paroli: "帕罗利策略：每次赢都将赌注翻倍，输了则回到基础赌注。风险较低，适合追求稳定盈利。",
      dalembert: "达朗贝尔策略：每次输都增加一个单位的赌注，赢了则减少一个单位的赌注。风险适中，适合稳健型玩家。",
      oneThreeTwoSix: "1-3-2-6 策略：按照 1, 3, 2, 6 的顺序增加赌注，赢了则继续，输了则回到 1。适合短期盈利。",
      labouchere: "拉布谢尔策略：使用一个数字序列来决定赌注，输了则将输的赌注加到序列末尾，赢了则移除序列两端的数字。适合有计划的投注。",
      oscarsGrind: "奥斯卡磨策略：每次赢都增加一个单位的赌注，输了则保持不变，直到盈利为止。适合稳健型玩家。",
      reverseMartingale: "逆向马丁格尔策略：每次赢都将赌注翻倍，输了则回到基础赌注。适合在连胜时增加盈利。",
      flatBetting: "固定注码策略：每次都投注相同的金额。简单且风险较低。",
      kent: "肯特策略：根据前一轮的结果调整赌注，赢了增加一个单位，输了减少一个单位，但不会低于基础赌注。适合稳健型玩家。",
      monteCarlo: "蒙特卡洛策略：使用一个数字序列，每次投注序列两端数字之和，赢了移除两端数字，输了将投注额加到序列末尾。适合有计划的投注。",
      cubanStrategy: "古巴策略：在连续输两次后，将赌注增加到基础赌注的三倍，赢了则回到基础赌注。适合在连输后尝试快速回本。",
      tenPercentStrategy: "10%策略：每次投注当前余额的10%。适合在盈利时增加投注，亏损时减少投注。"
    };

    formulaSelect.addEventListener('change', () => {
      formulaDescriptionDiv.textContent = formulaDescriptions[formulaSelect.value] || '';
    });

    startBtn.addEventListener('click', () => {
      const baseBet = parseInt(baseBetInput.value, 10);
      const maxRounds = parseInt(maxRoundsInput.value, 10);
      const formula = formulaSelect.value;

      resultsTableBody.innerHTML = '';
      if (balanceChart) {
        balanceChart.destroy();
      }
      runAutoBet(baseBet, maxRounds, formula);
    });

    function runAutoBet(baseBet, maxRounds, formula) {
      let currentBet = baseBet;
      let balance = 0;
      let round = 1;
      let lastBet = 1;
      let secondLastBet = 0;
      let wins = 0;
      let totalRounds = 0;
      let sequence = [1, 2, 3];
      let oscarProfit = 0;
      let oscarUnit = 1;
      let kentUnit = 1;
      let cubanLossCount = 0;
      const balanceData = [];

      const formulaFunction = (formula === 'martingale') ? martingale :
        (formula === 'fibonacci') ? fibonacci :
          (formula === 'paroli') ? paroli :
            (formula === 'dalembert') ? dalembert :
              (formula === 'oneThreeTwoSix') ? oneThreeTwoSix :
                (formula === 'labouchere') ? labouchere :
                  (formula === 'oscarsGrind') ? oscarsGrind :
                    (formula === 'reverseMartingale') ? reverseMartingale :
                      (formula === 'flatBetting') ? flatBetting :
                        (formula === 'kent') ? kent :
                          (formula === 'monteCarlo') ? monteCarlo :
                            (formula === 'cubanStrategy') ? cubanStrategy : tenPercentStrategy;

      while (round <= maxRounds) {
        const result = Math.random() < 0.5 ? 'win' : 'lose';
        if (result === 'win') {
          wins++;
          cubanLossCount = 0;
        } else {
          cubanLossCount++;
        }
        totalRounds++;
        let betResult;
        if (formula === 'labouchere') {
          betResult = formulaFunction(currentBet, result, sequence);
          currentBet = betResult.nextBet;
          sequence = betResult.sequence;
        } else if (formula === 'oscarsGrind') {
          betResult = formulaFunction(currentBet, result, oscarProfit, oscarUnit);
          currentBet = betResult.nextBet;
          oscarProfit = betResult.profit;
          oscarUnit = betResult.unit;
        } else if (formula === 'kent') {
          betResult = formulaFunction(currentBet, result, baseBet, kentUnit);
          currentBet = betResult.nextBet;
          kentUnit = betResult.unit;
        } else if (formula === 'monteCarlo') {
          betResult = formulaFunction(currentBet, result, sequence);
          currentBet = betResult.nextBet;
          sequence = betResult.sequence;
        } else if (formula === 'cubanStrategy') {
          betResult = formulaFunction(currentBet, result, baseBet, cubanLossCount);
          currentBet = betResult.nextBet;
        } else if (formula === 'tenPercentStrategy') {
          betResult = formulaFunction(currentBet, result, balance);
          currentBet = betResult.nextBet;
        }
        else {
          betResult = formulaFunction(currentBet, result, lastBet, secondLastBet);
          currentBet = betResult.nextBet;
        }
        balance += betResult.profit;
        secondLastBet = lastBet;
        lastBet = betResult.bet;
        balanceData.push(balance);

        const row = resultsTableBody.insertRow();
        const roundCell = row.insertCell();
        const betCell = row.insertCell();
        const resultCell = row.insertCell();
        const profitCell = row.insertCell();
        const balanceCell = row.insertCell();

        roundCell.textContent = round;
        betCell.textContent = betResult.bet;
        resultCell.textContent = result === 'win' ? '赢' : '输';
        profitCell.textContent = betResult.profit;
        balanceCell.textContent = balance;

        round++;
      }
      const winRate = totalRounds > 0 ? ((wins / totalRounds) * 100).toFixed(2) : 0;
      winRateDiv.textContent = `胜率: ${winRate}%`;
      renderChart(balanceData);
    }

    function renderChart(balanceData) {
      balanceChart = new Chart(balanceChartCanvas, {
        type: 'line',
        data: {
          labels: Array.from({ length: balanceData.length }, (_, i) => i + 1),
          datasets: [{
            label: '余额',
            data: balanceData,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: '轮数'
              },
              grid: {
                display: false
              }
            },
            y: {
              title: {
                display: true,
                text: '余额'
              },
              grid: {
                borderDash: [4, 4]
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          }
        }
      });
    }
    formulaDescriptionDiv.textContent = formulaDescriptions[formulaSelect.value] || '';
