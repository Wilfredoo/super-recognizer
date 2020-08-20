import shuffle from "./shuffle";

const processImages3 = async (images, typeArray, level) => {
  let numberOfButtons = 5;
  if (level === "III") numberOfButtons = 8;
  if (level === "II") numberOfButtons = 5;
  if (level === "I") numberOfButtons = 2;

  console.log("number", numberOfButtons);
  const allImages = [];

  await images.forEach((docSnapshot) => {
    const shuffledTypes = shuffle(typeArray);
    const filteredWrongTypes = shuffledTypes.filter(
      (data) => data !== docSnapshot.data().type
    );
    const slicedShuffledWrongTypes = filteredWrongTypes.slice(
      0,
      numberOfButtons
    );

    if (level === "III") {
      allImages.push({
        photo: docSnapshot.data().photo,
        answers: {
          rightAnswer: docSnapshot.data().type,
          wrongAnswer0: slicedShuffledWrongTypes[0],
          wrongAnswer1: slicedShuffledWrongTypes[1],
          wrongAnswer2: slicedShuffledWrongTypes[2],
          wrongAnswer3: slicedShuffledWrongTypes[3],
          wrongAnswer4: slicedShuffledWrongTypes[4],
          wrongAnswer5: slicedShuffledWrongTypes[5],
          wrongAnswer6: slicedShuffledWrongTypes[6],
          wrongAnswer7: slicedShuffledWrongTypes[7],
        },
      });
    } else if (level === "II") {
      allImages.push({
        photo: docSnapshot.data().photo,
        answers: {
          rightAnswer: docSnapshot.data().type,
          wrongAnswer0: slicedShuffledWrongTypes[0],
          wrongAnswer1: slicedShuffledWrongTypes[1],
          wrongAnswer2: slicedShuffledWrongTypes[2],
          wrongAnswer3: slicedShuffledWrongTypes[3],
          wrongAnswer4: slicedShuffledWrongTypes[4],
        },
      });
    } else if (level === "I") {
      allImages.push({
        photo: docSnapshot.data().photo,
        answers: {
          rightAnswer: docSnapshot.data().type,
          wrongAnswer0: slicedShuffledWrongTypes[0],
          wrongAnswer1: slicedShuffledWrongTypes[1],
        },
      });
    }

    // for (let i = 0; i < numberOfButtons; i++) {
    //   console.log("iiiii", i);
    //   allImages.push({
    //     answers: {

    //       wrongAnswer`${i}`: slicedShuffledWrongTypes[1],
    //     }

    //    })
    // }
  });

  const shuffledAllImages = shuffle(allImages);
  const slicedShuffledAll = shuffledAllImages.slice(0, 10);
  return slicedShuffledAll;
};

export default processImages3;
