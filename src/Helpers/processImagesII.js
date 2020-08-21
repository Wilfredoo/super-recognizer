import shuffle from "./shuffle";

const processImagesIII = async (imagesArray) => {
  const firstSubjectPicsArray = [];
  const secondSubjectPicsArray = [];
  const otherSubjectsPicsArray = [];

  let arrayOfIndexes = [];
  for (let i = 0; i < imagesArray.length; i++) {
    arrayOfIndexes.push(i);
  }

  shuffle(arrayOfIndexes);

  const firstRightAnswerArrayIndex = arrayOfIndexes.pop();
  const secondRightAnswerArrayIndex = arrayOfIndexes.pop();

  await imagesArray.forEach((docSnapshot, index) => {
    for (let i = 0; i < docSnapshot.data().photos.length; i++) {
      if (index === firstRightAnswerArrayIndex) {
        firstSubjectPicsArray.push({
          url: docSnapshot.data().photos[i],
          rightAnswer: true,
        });
      } else if (index === secondRightAnswerArrayIndex) {
        secondSubjectPicsArray.push({
          url: docSnapshot.data().photos[i],
          rightAnswer: true,
        });
      } else {
        otherSubjectsPicsArray.push({
          url: docSnapshot.data().photos[i],
          rightAnswer: false,
        });
      }
    }
  });

  const firstSubjectRandomTruePic = firstSubjectPicsArray.pop(
    Math.floor(Math.random() * firstSubjectPicsArray.length) // getting one from the true pics
  );

  const secondSubjectRandomTruePic = secondSubjectPicsArray.pop(
    Math.floor(Math.random() * secondSubjectPicsArray.length) // getting one from the true pics
  );

  let truePics = [];
  truePics.push(...firstSubjectPicsArray, ...secondSubjectPicsArray);

  let shuffledTruthies = [];
  shuffledTruthies = await shuffle(truePics); //shuffle truthies
  let slicedShuffledTruthies = [];
  slicedShuffledTruthies = await shuffledTruthies.slice(0, 10); // slicing truthies
  let shuffledFalseArray = [];
  shuffledFalseArray = await shuffle(otherSubjectsPicsArray); // shuffling big falseys array

  let slicedShuffledFalseArray = [];
  slicedShuffledFalseArray = await shuffledFalseArray.slice(0, 20); // slicing falseys shuffled array

  let mixedArray = [];
  mixedArray = [...slicedShuffledFalseArray, ...slicedShuffledTruthies]; // mixing 10 truthies and 20 falseys
  let slicedShuffledMixedArray = [];

  const shuffledMixedArray = await shuffle(mixedArray); //2nd shuffle: shuffling mixed array
  slicedShuffledMixedArray = await shuffledMixedArray.slice(0, 15); // let cut it again
  await slicedShuffledMixedArray.unshift(firstSubjectRandomTruePic); // add first truthie at the beginning
  slicedShuffledMixedArray.unshift(secondSubjectRandomTruePic); // add second truthie at the beginning
  // console.log("mixed", slicedShuffledMixedArray)
  return slicedShuffledMixedArray;
};

export default processImagesIII;
