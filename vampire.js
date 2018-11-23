class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
     let creator = this.creator;
    var numberOfVampires = 0;
    while(creator != null) {
      creator = creator.creator; 
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let numberThisFromOriginal = this.numberOfVampiresFromOriginal;
    let numberVampireFromOriginal = vampire.numberOfVampiresFromOriginal;

    return (numberVampireFromOriginal > numberThisFromOriginal);
  
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVampire = this;
    let aVampire = vampire;
    
    if(currentVampire === aVampire) {
      return currentVampire;
    }

    if(currentVampire.numberOfVampiresFromOriginal < aVampire.numberOfVampiresFromOriginal) {
      aVampire = aVampire.creator;
      return currentVampire.closestCommonAncestor(aVampire);
    } else if(currentVampire.numberOfVampiresFromOriginal > aVampire.numberOfVampiresFromOriginal) {
      currentVampire = currentVampire.creator;
      return currentVampire.closestCommonAncestor(aVampire);
    }
    if(currentVampire.numberOfVampiresFromOriginal === aVampire.numberOfVampiresFromOriginal) {
      return currentVampire.creator.closestCommonAncestor(aVampire.creator);
    }
    
  }
  

module.exports = Vampire;

