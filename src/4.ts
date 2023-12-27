function shortestPath(
  start: number,
  stations: number[],
  target: number,
  max: number
): number {
  const distances: number[] = Array(max + 1).fill(Infinity);
  distances[start] = 0;

  let queue: number[] = [];
  for (let i = 0; i < max + 1; i++) {
    queue.push(i);
  }

  while (queue.length > 0) {
    let currentNode = -1;
    let minDistance = Infinity;
    for (const node of queue) {
      if (distances[node] < minDistance) {
        currentNode = node;
        minDistance = distances[node];
      }
    }

    if (currentNode !== -1) {
      queue = queue.filter((item) => item !== currentNode);

      let neighborNodes = [currentNode - 1, currentNode + 1];
      const otherStations = stations.filter(
        (station) => station !== currentNode
      );
      if (stations.includes(currentNode)) {
        neighborNodes.push(...otherStations);
      }
      let edgeDistance = 1;

      for (const neighborNode of neighborNodes) {
        if (queue.indexOf(neighborNode) !== -1) {
          if (
            stations.includes(currentNode) &&
            otherStations.includes(neighborNode)
          ) {
            edgeDistance = 0;
          }

          const dist = distances[currentNode] + edgeDistance;
          if (dist < distances[neighborNode]) {
            distances[neighborNode] = dist;
          }
        }
      }
    }
  }

  return distances[target];
}

function swap(arr: number[], a: number, b: number): number[] {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;

  return arr;
}

function permute(
  shops: number[],
  index: number,
  length: number,
  p: number[][]
): void {
  if (index === length) {
    const shopsCopy = [...shops];
    p.push(shopsCopy);
    return;
  }

  for (let i = index; i < length; i++) {
    shops = swap(shops, index, i);
    permute(shops, index + 1, length, p);
    shops = swap(shops, index, i);
  }
}

function minEnergy(
  start: number,
  shops: number[],
  stations: number[],
  target: number
): number {
  const max = Math.max(start, ...shops, ...stations, target);

  let permutedShops: number[][] = [];
  permute(shops, 0, shops.length, permutedShops);

  let shortestDistance = Infinity;
  for (const shopsComb of permutedShops) {
    let totalDistance = 0;

    let distance = shortestPath(start, stations, shopsComb[0], max);
    totalDistance += distance;
    for (let i = 0; i < shopsComb.length - 1; i++) {
      distance = shortestPath(shopsComb[i], stations, shopsComb[i + 1], max);
      totalDistance += distance;
    }
    distance = shortestPath(
      shopsComb[shopsComb.length - 1],
      stations,
      target,
      max
    );
    totalDistance += distance;

    if (totalDistance < shortestDistance) {
      shortestDistance = totalDistance;
    }
  }

  return shortestDistance;
}
