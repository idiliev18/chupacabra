'use strict'

class User{
    // public
    print(){
        console.log(this.id);
    }

    // private
    #id;
    #firstName;
    #lastName;
    #age;
    #city;
    #phone;
    #username;
    #email;
    #isVerified;
    // protected
}

// properties

Object.defineProperty(User, 'id', {
    get() {
      return this.id;
    },
  
    set(id) {
      this.id = id;
    }
  });

  Object.defineProperty(User, 'firstName', {
    get() {
      return this.firstName;
    },
  
    set(firstName) {
      this.firstName = firstName;
    }
  });

  Object.defineProperty(User, 'lastName', {
    get() {
      return this.lastName;
    },
  
    set(lastName) {
      this.lastName = lastName;
    }
  });

  Object.defineProperty(User, 'age', {
    get() {
      return this.age;
    },
  
    set(age) {
      this.age = age;
    }
  });

  Object.defineProperty(User, 'city', {
    get() {
      return this.city;
    },
  
    set(city) {
      this.city = city;
    }
  });

  Object.defineProperty(User, 'phone', {
    get() {
      return this.phone;
    },
  
    set(phone) {
      this.phone = phone;
    }
  });

  Object.defineProperty(User, 'username', {
    get() {
      return this.username;
    },
  
    set(username) {
      this.username = username;
    }
  });

  Object.defineProperty(User, 'email', {
    get() {
      return this.email;
    },
  
    set(email) {
      this.email = email;
    }
  });

  Object.defineProperty(User, 'isVerified', {
    get() {
      return this.isVerified;
    },
  
    set(isVerified) {
      this.isVerified = isVerified;
    }
  });

let fiki = new User();
fiki.id = 1;
fiki.print();
