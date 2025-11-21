const fs = require('fs');

function readJsonFile(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    return JSON.parse(data);
}

function decodeValue(base, value) {
    const baseNum = parseInt(base);
    return BigInt(parseInt(value.toLowerCase(), baseNum));
}

function findConstantC(points, k) {
    const selectedPoints = points.slice(0, k);
    let C = 0n;
    
    for (let i = 0; i < selectedPoints.length; i++) {
        const [xi, yi] = selectedPoints[i];
        let numerator = 1n;
        let denominator = 1n;
        
        for (let j = 0; j < selectedPoints.length; j++) {
            if (i !== j) {
                const [xj, _] = selectedPoints[j];
                numerator *= BigInt(-xj);
                denominator *= BigInt(xi - xj);
            }
        }
        
        C += yi * numerator / denominator;
    }
    
    return Number(C);
}

function main() {
    const filename = process.argv[2] || 'input.json';
    const data = readJsonFile(filename);
    
    const n = data.keys.n;
    const k = data.keys.k;
    
    const points = [];
    
    for (let i = 1; i <= n; i++) {
        if (data[i.toString()]) {
            const base = data[i.toString()].base;
            const value = data[i.toString()].value;
            const x = i;
            const y = decodeValue(base, value);
            points.push([x, y]);
        }
    }
    
    const C = findConstantC(points, k);
    console.log(C);
}

main();
