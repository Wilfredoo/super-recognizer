const processImages3 = async (images, typeArray) => {
  const allImages = [];
  await images.forEach((docSnapshot, index) => {
    allImages.push({
      photo: docSnapshot.data().photo,
      rightAnswer: docSnapshot.data().type,
    
    });
    const shuffledTypes = shuffle(typeArray)
  const wrongTypes = shuffledTypes.slice(0, 3);
  console.log("wrong types", wrongTypes)


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
