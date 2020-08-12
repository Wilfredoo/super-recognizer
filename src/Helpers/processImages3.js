import shuffle from "./shuffle"

const processImages3 = async (images, typeArray) => {
  const allImages = [];

  await images.forEach((docSnapshot) => {
    const shuffledTypes = shuffle(typeArray);
    const filteredWrongTypes = shuffledTypes.filter(
      (data) => data !== docSnapshot.data().type
    );
    const slicedShuffledWrongTypes = filteredWrongTypes.slice(0, 5);

    allImages.push({
      photo: docSnapshot.data().photo,
      answers: {
        rightAnswer: docSnapshot.data().type,
        wrongAnswer0: slicedShuffledWrongTypes[0],
        wrongAnswer1: slicedShuffledWrongTypes[1],
        wrongAnswer2: slicedShuffledWrongTypes[2],
        wrongAnswer3: slicedShuffledWrongTypes[3],
        wrongAnswer4: slicedShuffledWrongTypes[4],
      }
    });
  });

  const shuffledAllImages = shuffle(allImages);
  const slicedShuffledAll = shuffledAllImages.slice(0, 10);
  return slicedShuffledAll;
};



export default processImages3;
