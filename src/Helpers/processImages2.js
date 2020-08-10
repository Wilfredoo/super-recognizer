import shuffle from "./shuffle"


const processImages2 = async (realImagesDocs, fakeImagesDocs) => {
  let realPicsArray = [];
  await realImagesDocs.forEach((docSnapshot) => {
    for (let i = 0; i < docSnapshot.data().photos.length; i++) {
      realPicsArray.push({
        url: docSnapshot.data().photos[i],
        rightAnswer: false,
      });
    }
  });
  let fakePicsArray = [];
  await fakeImagesDocs.forEach((docSnapshot) => {
    for (let i = 0; i < docSnapshot.data().photos.length; i++) {
      fakePicsArray.push({
        url: docSnapshot.data().photos[i],
        rightAnswer: true,
      });
    }
  });

  const oneTruthie = realPicsArray.splice(
    Math.floor(Math.random() * realPicsArray.length),
    1
  );

  const shuffledAllTruthies = shuffle(realPicsArray);
  const shuffledAllFakeys = shuffle(fakePicsArray);
  const slicedShuffledTruthies = shuffledAllTruthies.slice(0, 5);
  const slicedShuffledFakeys = shuffledAllFakeys.slice(0, 5);
  const allPics = slicedShuffledTruthies.concat(slicedShuffledFakeys);
  const shuffledAllPics = shuffle(allPics);
  shuffledAllPics.unshift(oneTruthie[0]); // add the truthie at the beginning
  return shuffledAllPics;
};



export default processImages2;
