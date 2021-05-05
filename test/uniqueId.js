function checkDuplicates(generator, count){
    var hash = {};
    var dupe = [];
    for(var idx = 0; idx < count; ++idx){
      var gen = generator(idx); // generate our unique ID
  
      // if it already exists, then it has been duplicated
      if(typeof hash[gen] != 'undefined'){
        dupe.push({
          duplicate: gen,
          indexCreated: hash[gen],
          indexDuplicated: idx,
          duplicateCount: dupe.filter(function(cur){return cur.duplicate == gen}).length,
        });
      }
      hash[gen] = idx;
    }
    return dupe;
  }

  duplicate = {
    duplicate: "7srx2zt3zj2lnmi", // the generated id that was duplicated
    duplicateCount: 0,            // 0 is the first duplication, so 1 is the second duplication etc
    indexCreated: 133959,         // the index where the original ID was created
    indexDuplicated: 168948,      // the index where the original ID is duplicated
  }
  function myUniqueID(){
    return Math.random().toString(36).slice(2);
  }
  
  checkDuplicates(myUniqueID, Math.pow(10, 4)); // Math.pow(10, 4) == 10'000 times

  var duplicates = checkDuplicates(myUniqueID, Math.pow(10, 7)) // 10 MILLION

// now only show the duplicates that have a `duplicateCount` of more than 1
// (meaning they have been duplicated for a second time)
duplicates.filter(function(cur){
  return cur.duplicateCount > 0
});

function uniqueID(){
  function chr4(){
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() + chr4() + chr4();
}

uniqueID()