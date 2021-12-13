const resolver = {
  resolve: function resolve(options, callback) {
    // The string to resolve
    const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
    const combinedOptions = Object.assign({}, options, { resolveString: resolveString });

    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    };

    function doRandomiserEffect(options, callback) {
      const characters = options.characters;
      const timeout = options.timeout;
      const element = options.element;
      const partialString = options.partialString;

      let iterations = options.iterations;

      setTimeout(() => {
        if (iterations >= 0) {
          const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });

          // Ensures partialString without the random character as the final state.
          if (iterations === 0) {
            element.textContent = partialString;
          } else {
            // Replaces the last character of partialString with a random character
            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
          }

          doRandomiserEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      }, options.timeout);
    };

    function doResolverEffect(options, callback) {
      const resolveString = options.resolveString;
      const characters = options.characters;
      const offset = options.offset;
      const partialString = resolveString.substring(0, offset);
      const combinedOptions = Object.assign({}, options, { partialString: partialString });

      doRandomiserEffect(combinedOptions, () => {
        const nextOptions = Object.assign({}, options, { offset: offset + 1 });

        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      });
    };

    doResolverEffect(combinedOptions, callback);
  } };


/* Some GLaDOS quotes from Portal 2 chapter 9: The Part Where He Kills You
 * Source: http://theportalwiki.com/wiki/GLaDOS_voice_lines#Chapter_9:_The_Part_Where_He_Kills_You
 */
const strings = [

'To this favorite person of mine,',
'You came in to my life in the most unexpected way, I was snobbish I know, but good thing you got on my good side.',
'It\'s cute if you think about it, in an instant I was hella comfy with you, and i just want to thank you so much for the journey you went through just to be part of my world and to my suprise I became part of your world too ehe.',

'And now we\'re here, I have the most sweet, caring, understanding, funny, charming, handsome, and loving boyfriend!',
'You are the best thing that has happened to me, and I\'m just so lucky to have you.',
'So take good care of yourself ha? I\'d love to take care of you personally yet as of now I can only do it virtually. ',
'To your studies, study hard, but don\'t forget to rest okie? Plus you\'ll have me as a study buddy if you need one hihi.',
'To your gala with friends or families, do remember to always keep safe and have fun ha.',
'To your health, don\'t push yourself too much, please do drink moderately and get enough sleep ha.',
'Lastly, you don\'t need to do this every night, but don\'t forget to pray ha! ',
'Someday i hope to physically be with you everyday, amma hug you ow so tight and kiss you so much lagi hihi.',
'I miss you and i really hope to see you soon.',

'From the journies you need to take alone to the journies we will be taking together, I will be there for you, not behind you, nor ahead of you, but besides you, every step of the way.',
'To more memories and adventures to you and to us!',

'HAPPIEST 19TH BIRHTDAY PHOVIE TUUU!',

'I love you <3',

'↓↓↓'];



let counter = 0;

const options = {
  // Initial position
  offset: 0,
  // Timeout between each random character
  timeout: 10,
  // Number of random characters to show
  iterations: 10,
  // Random characters to pick from
  characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z'],
  // String to resolve
  resolveString: strings[counter],
  // The element
  element: document.querySelector('[data-target-resolver]') };


// Callback function when resolve completes
function callback() {
  setTimeout(() => {
    counter++;

    if (counter >= strings.length) {
      counter = 0;
    }

    let nextOptions = Object.assign({}, options, { resolveString: strings[counter] });
    resolver.resolve(nextOptions, callback);
  }, 1000);
}

resolver.resolve(options, callback);