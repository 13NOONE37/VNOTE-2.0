const uuid4 = require('./node_modules/uuid4');
const fs = require('fs');
fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  const config = JSON.parse(data);

  const newConfig = { notes: [], tags: [], files: [] };

  //?Parse tags
  config[6].forEach((tag) => {
    if (tag.name === 'all') return;
    newConfig['tags'].push(tag.name);
  });

  //?Parse notes
  let previousDate = new Date();
  config[2].forEach((note) => {
    let temp = {};
    temp['id'] = uuid4(); //✅
    temp['title'] = note.title || ''; //✅
    temp['checkList'] = note.doneTask || []; //✅

    for (let i = 0; i < note.content.match(/\n/g)?.length || 0; i++) {
      if (temp['checkList'][i] == undefined) temp['checkList'][i] = false;
    }
    temp['content'] = encodeURI(note.content.replace(/\n/g, '<br>')) || ''; //✅

    temp['lastEditDate'] = new Date(); //✅

    const currentDate = new Date(previousDate.getTime() + 1000);
    temp['date'] = currentDate; //✅
    previousDate = currentDate;

    if (/\d{2}\.\d{2}\.\d{4}/.test(note.title)) {
      const [day, month, year] = note.title.split('.');
      if (
        Number(day) >= 1 &&
        Number(day) <= 31 &&
        Number(month) >= 1 &&
        Number(month) <= 12 &&
        !isNaN(day) &&
        !isNaN(month) &&
        !isNaN(year)
      ) {
        temp['date'] = new Date(`${month}-${day}-${year}`);
      }
    }
    temp['color'] = 1; //✅
    temp['isDeleted'] = Boolean(note.isDeleted); //✅
    temp['isListed'] = Boolean(note.isCheckboxList); //✅
    temp['tags'] = {
      // all: true
    }; //✅
    note.groups.forEach((group) => {
      if (
        group.toLowerCase() === 'undefined' ||
        group.toLowerCase() === 'all' ||
        group.toLowerCase() === 'trash'
      )
        return;
      temp['tags'][group] = group;
    });
    temp['images'] = []; //✅
    temp['draws'] = []; //✅
    temp['records'] = []; //✅
    newConfig['notes'].push(temp);
  });

  //?Export
  // console.log(newConfig)
  fs.writeFile(
    './VNOTEConfig.json',
    JSON.stringify(newConfig),
    'utf-8',
    (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    },
  );
});
