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
    confChamps90: {
        type: 'range',
        range: 2
    },
    lpa: {
        type: 'range',
        range: 5
    }
}

export const gradeGuess = (guess, answer) => {
    const results = {};

    Object.entries(rules).forEach(([field, rule]) => {
        const guessValue = guess[field]
        const answerValue = answer[field]

        let color, dir;
        switch (rule.type) {
            case 'exact':
                (guessValue == answerValue) ? color = '#6AAA64' : color = '#787C7E';
                break;
            case 'range':
                if (guessValue == answerValue) {
                    color = '#6AAA64';
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
            default:
                color = '#787C7E';
                dir = '';
        }

        results[field] = {
            color: color,
            dir: dir,
            value: guess[field],
        };
    })
    return results;
}