export const manhattan_heuristic = function(a, b) {
    return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
}

export const euclidean_heuristic = function(a, b) {
    return Math.sqrt(Math.pow(Math.abs(b.x - a.x), 2) + Math.pow(Math.abs(b.y - a.y), 2))
}

export const octile_heuristic = function(a, b) {
    let octile_d = Math.sqrt(2) - 1;
    let dx = Math.abs(b.x - a.x)
    let dy = Math.abs(b.y - a.y) 
    return octile_d * dx + dy;
}

export const chebyshev_heuristic = function(a, b) {
    let dx = Math.abs(b.x - a.x)
    let dy = Math.abs(b.y - a.y) 
    return Math.max(dx, dy)
}

