import xhr from 'xhr'
import {apiUrls} from '../config'
import * as tf from '@tensorflow/tfjs';
import regeneratorRuntime from "regenerator-runtime";
import {MobileNet} from './mobilenet';


const breakPoint = 800
const canvSize = 640
const targetPct = 0.7
const targetTop = 0.4

export default async function snap(state, _, send, done) {
  send('startSnap', done)

  const winW = window.innerWidth
  const winH = window.innerHeight
  const vidW = state.video.videoWidth
  const vidH = state.video.videoHeight

  if (winW >= breakPoint) {
    const cropSize = Math.min(winW, winH) * targetPct
    const sourceSize = (cropSize / Math.max(winW, winH)) * vidW

    state.canvas.width = state.canvas.height = canvSize

    state.ctx.drawImage(
      state.video,
      Math.round(((winW / 2 - cropSize / 2) / winW) * vidW),
      Math.round(((winH * targetTop - cropSize / 2) / winH) * vidH),
      sourceSize,
      sourceSize,
      0,
      0,
      canvSize,
      canvSize
    )
  } else {
    state.canvas.width = vidW
    state.canvas.height = vidH
    state.ctx.drawImage(state.video, 0, 0)
  }

  let labels

  // async function loadHostedPretrainedModel(url) {
  //   console.log('Loading pretrained model from ' + url);
  //   try {
  //     const model = await tf.loadGraphModel(url);
  //     console.log('Done loading pretrained model.');
  //     return model;
  //     } catch (err) {
  //       console.error(err);
  //       console.log('Loading pretrained model failed.');
  //     }
  // }



  // const HOSTED_MODEL_JSON_URL = 'https://storage.googleapis.com/user_yiling/model.json'
  // const model = await loadHostedPretrainedModel(HOSTED_MODEL_JSON_URL);

  
  // function predict(input) {
  //   const INPUT_NODE_NAME = 'input';
  //   const OUTPUT_NODE_NAME = 'final_result';
  //   const PREPROCESS_DIVISOR = tf.scalar(255 / 2);
  //   const preprocessedInput = tf.div(
  //       tf.sub(input.asType('float32'), PREPROCESS_DIVISOR),
  //       PREPROCESS_DIVISOR);
  //   const reshapedInput =
  //       preprocessedInput.reshape([1, ...preprocessedInput.shape]);
  //   return this.model.execute(
  //       {[INPUT_NODE_NAME]: reshapedInput}, OUTPUT_NODE_NAME);
  // }

  //let meanImageNetRGB= tf.tensor1d([123.68,116.779,103.939]);
  
  let imgPixel = tf.browser
              .fromPixels(state.canvas)
  //Uncaught (in promise) Error: The shape of dict['images'] provided in model.execute(dict) must be [-1,224,224,3], but was [1,480,640,3]

  const smalImg = tf.image.resizeBilinear(imgPixel, [224,224]);
  const resized = tf.cast(smalImg, 'float32');
  //const t4d = tf.tensor4d(Array.from(resized.dataSync()),[1,224,224,3])
              // .resizeNearestNeighbor([224, 224])
              // .toFloat()
              // .sub(meanImageNetRGB)
              // .reverse(2)
              // .expandDims()
              // .dataSync()
  // let predictOut = model.predict(imgPixel);

  // const logits = Array.from(predictOut.dataSync());
  // console.log(logits)
  // console.log('Done with the hassle');
  const mobileNet = new MobileNet();
  await mobileNet.load();
  console.timeEnd('Loading model');

  let result = mobileNet.predict(resized);
  const topK = mobileNet.getTopKClasses(result, 5);

  labels = [{mid: "/m/0dzct", description: topK[0].label, score: topK[0].value, topicality: 0.9794876}];
  //labels = [{mid: "/m/0dzct", description: "Pig", score: 0.9794876, topicality: 0.9794876}];
  send('translate', labels, done)
  setTimeout(send.bind(null, 'endSnap', done), 200)


}
