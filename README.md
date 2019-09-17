# [Beauty Classifer](https://zoo-aiy.appspot.com/)

### [An AI Experiment](https://zoo-aiy.appspot.com/)

✨ [Try the live demo here.](https://zoo-aiy.appspot.com/) ✨

![](https://oxism.com/thing-translator/thing-translator.gif)

![](https://oxism.com/thing-translator/img/1.jpg)

## ![](https://oxism.com/thing-translator/img/2.jpg)

Beauty identifier is a web app that lets you point your phone (or laptop) at
stuff to recognise what beauty product it is.

Behind the scenes Beauty Classifier is trained by taking 10s videos of the objects and do transfer learning on ImageNet, then return French version using Google
[Translate](https://cloud.google.com/translate/) APIs.

### Development

To start a development server on `9966` that will watch for code changes simply run:

```
$ npm start
```

To optimize the output for production, run:

```
$ npm run build
```

If you'd like to host in production, you'll need to setup [Google Cloud Platform](https://cloud.google.com/) 
and run the following commands which will use AppEngine to deploy it on cloud. 
```
$ gcloud app deploy
```
