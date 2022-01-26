import yargs from 'yargs';
import fetch from 'node-fetch';

async function getRandomEmoji(arg1) {
  if (arg1 === undefined) {
    let randomURL = `https://emojihub.herokuapp.com/api/random`;
    try {
      const res = await fetch(randomURL);
      const data = await res.json();
      console.log(`${data.name}'s emoji: htmlCode = ${data.htmlCode}`);
    } catch (err) {
      console.error(err);
    }
  } else if (arg1.c) {
    {
      let categoryURL = `https://emojihub.herokuapp.com/api/random/category_${arg1.c}`;
      try {
        const res = await fetch(categoryURL);
        const data = await res.json();
        console.log(`${data.name}'s emoji: htmlCode = ${data.htmlCode}`);
      } catch (err) {
        console.error(err);
        console.log(arg1);
      }
    }
  } else if (arg1.g) {
    let groupURL = `https://emojihub.herokuapp.com/api/random/group_${arg1.g}`;
    try {
      const res = await fetch(groupURL);
      const data = await res.json();
      console.log(`${data.name}'s emoji: htmlCode = ${data.htmlCode}`);
    } catch (err) {
      console.error(err);
      console.log(arg1);
    }
  }
}

const argv = yargs(process.argv.slice(2))
  .options({
    c: {
      demand: false,
      alias: 'category',
      describe: "specify which emoji's category to get his htmlCode",
      string: true,
    },
    g: {
      demand: false,
      alias: 'group',
      describe: "specify which emoji's group to get his htmlCode",
      string: true,
    },
  })
  .command('random', "get a random htmlcode's emoji", {}, (argv) => {
    if (argv.c === undefined && argv.g === undefined) {
      getRandomEmoji();
    } else {
      getRandomEmoji(argv);
    }
  })
  .help()
  .alias('help', 'h').argv;
