type GenerateType = {
    winner: string,
    quantity: number,
    awardedQuota: string
}

export const generatorQuota = ({ winner, quantity, awardedQuota }: GenerateType) => {
    let qntQuotas = quantity;
    let quotas: string[] = [];

    if (winner) {
        qntQuotas--;
    }

    for (let i = 0; i < qntQuotas; i++) {
        let uni: number[] = [];
        for (let j = 0; j < 6; j++) {
            uni.push(Math.floor(Math.random() * 9 + 1));
        }
        quotas.push(uni.join(''));
    }

    let allQuotas: string[] = quotas;

    if (winner) {
        allQuotas = [...allQuotas, `${awardedQuota}`];
    }

    let shuffledArray = shuffleArray(allQuotas);
    return shuffledArray;
}

const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
