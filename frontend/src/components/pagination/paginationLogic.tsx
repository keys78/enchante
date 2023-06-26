export function getPaginationItems(currentPage: number, lastPage: number, maxLength: number) {
    const res: number[] = [];
    const isNearFirstPage = currentPage <= maxLength / 2;
    const isNearLastPage = lastPage - currentPage < maxLength / 2;

    let sideLength: number;

    switch (true) {
        case lastPage <= maxLength:
            res.push(...Array.from({ length: lastPage }, (_, i) => i + 1));
            break;
        case isNearFirstPage:
            res.push(...Array.from({ length: maxLength - 1 }, (_, i) => i + 1), NaN, lastPage);
            break;
        case isNearLastPage:
            res.push(1, NaN, ...Array.from({ length: maxLength - 1 }, (_, i) => lastPage - maxLength + i + 2));
            break;
        default:
            sideLength = Math.floor((maxLength - 3) / 2);
            res.push(1, NaN, ...Array.from({ length: sideLength * 2 + 1 }, (_, i) => currentPage - sideLength + i), NaN, lastPage);
            break;
    }

    return res;
}

