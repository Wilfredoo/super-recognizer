import shuffle from "./shuffle"


const processImages = async (imagesArray) => {
    const rightAnswerArrayIndex = await Math.floor(
      Math.random() * imagesArray.length
    );
    let picsArray = [];
    await imagesArray.forEach((docSnapshot, index) => {
      for (let i = 0; i < docSnapshot.data().photos.length; i++) {
        if (index === rightAnswerArrayIndex) {
          picsArray.push({
            url: docSnapshot.data().photos[i],
            rightAnswer: true,
          });
        } else {
          picsArray.push({
            url: docSnapshot.data().photos[i],
            rightAnswer: false,
          });
        }
      }
    });

    const truePics = [];
    for (let i = 0; i < picsArray.length; i++) {
      if (picsArray[i].rightAnswer === true) await truePics.push(picsArray[i]); // putting truthies in a separate array
    }
    const shuffledTruthies = shuffle(truePics); //shuffle truthies
    const slicedShuffledTruthies = shuffledTruthies.slice(0, 5); // slicing truthies
    const falseArray = await picsArray.filter((data) => {
      if (data.rightAnswer === false) return true; // filtering big array of truthies and leaving falseys behind
      return false;
    });
    const shuffledFalseArray = shuffle(falseArray); // shuffling big falseys array
    const slicedShuffledFalseArray = shuffledFalseArray.slice(0, 10); // slicing falseys shuffled array
    const oneRandomTruePic = truePics.pop(
      Math.floor(Math.random() * truePics.length) // getting one from the true pics
    );
    const mixedArray = [...slicedShuffledFalseArray, ...slicedShuffledTruthies]; // mixing 10 falseys and 5 truthies
    const shuffledMixedArray = shuffle(mixedArray); //2nd shuffle: shuffling mixed array
    const slicedShuffledMixedArray = shuffledMixedArray.slice(0, 10); // let cut it again
    slicedShuffledMixedArray.unshift(oneRandomTruePic); // add the truthie at the beginning
    return slicedShuffledMixedArray
  };

  export default processImages