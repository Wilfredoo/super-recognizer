const processImages3 = async (images, typeArray) => {
  const allImages = [];

  await images.forEach((docSnapshot) => {
    const shuffledTypes = shuffle(typeArray);
    const filteredWrongTypes = shuffledTypes.filter(
      (data) => data !== docSnapshot.data().type
    );
    const slicedShuffledWrongTypes = filteredWrongTypes.slice(0, 3);

    allImages.push({
      photo: docSnapshot.data().photo,
      answers: {
        rightAnswer: docSnapshot.data().type,
        wrongAnswer0: slicedShuffledWrongTypes[0],
        wrongAnswer1: slicedShuffledWrongTypes[1],
        wrongAnswer2: slicedShuffledWrongTypes[2],
      }
    });
  });

  const shuffledAllImages = shuffle(allImages);
  const slicedShuffledAll = shuffledAllImages.slice(0, 10);
  return slicedShuffledAll;
};

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default processImages3;
