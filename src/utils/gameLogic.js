const rules = {
    league: {
        type: 'exact'
    },
    firstSeason: {
        type: 'range',
        range: 20
    },
    lChamps: {
        type: 'range',
        range: 5
    },
    champs: {
        type:'range',
        range: 2
    },
    lcga: {
        type: 'range',
        range: 5
    },
    lpa: {
        type: 'range',
        range: 5
    },
    pColor: {
        type: 'color',
        range: 75
    },
    sColor: {
        type: 'color',
        range: 75
    }
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }

  function colorDistance(rgb1, rgb2) {
    return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    );
  }

export const gradeGuess = (guess, answer) => {
    const results = {};

    Object.entries(rules).forEach(([field, rule]) => {
        const guessValue = guess[field]
        const answerValue = answer[field]
        let distance = null;

        if (!answerValue) {
            if (answerValue == guessValue) {
                results[field] = {
                    color: '#6AAA64',
                    value: 'Never',
                    dir: ''
                }
            } else {
                results[field] = {
                    color: '#787C7E',
                    value: guessValue,
                    dir: ''
                }
            }
            return results;
        }

        if (rule.type == 'color') {
            const answerColor = hexToRgb(answerValue);
            const guessColor = hexToRgb(guessValue);
            distance = colorDistance(answerColor, guessColor);
        }

        let color;
        let dir = '';
        switch (rule.type) {
            case 'exact':
                (guessValue == answerValue) ? color = '#6AAA64' : color = '#787C7E';
                break;
            case 'range':
                if (guessValue == answerValue) {
                    color = '#6AAA64';
                } else if (!guessValue) {
                    color = '#787C7E';
                    break;
                } else if (Math.abs(guessValue - answerValue) <= rule.range) {
                    color = '#c9b458';
                } else {
                    color = '#787C7E';
                }
                if (guessValue < answerValue) {
                    dir = '↑';
                } else if (guessValue > answerValue) {
                    dir = '↓';
                }
                break;
            case 'color':
                if (distance == 0) {
                    color = '#6AAA64';
                } else if (distance < rule.range) {
                    color = '#c9b458';

                } else {
                    color = '#787C7E';
                }
                break;
            default:
                color = '#787C7E';
                dir = '';
        }

        let value = guess[field];
        if (!guess[field]) value = 'Never'

        results[field] = {
            color: color,
            dir: dir,
            value: value
        };
    })
    return results;
}