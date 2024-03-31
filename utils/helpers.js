import * as Location from 'expo-location';

export const updateLocation = async (latitude, longitude, email) => {
  console.log('updating location');
  try {
    const response = await fetch(
      'http://192.168.1.169:3000/api/users/updatelocation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude, email }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return;
    }
  } catch (err) {
    console.log('Error:', err);
  }
};

export const getLocation = async (email) => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    updateLocation(location.coords.latitude, location.coords.longitude, email);
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
        updateLocation(
          location.coords.latitude,
          location.coords.longitude,
          email
        );
      }
    );
    return location;
  } catch (err) {
    console.log('Error:', err);
  }
};

export const getAllFriends = async (email) => {
  try {
    const response = await fetch(
      'http://192.168.1.169:3000/api/friends/getall',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const friends = await response.json();
    return friends;
  } catch (err) {
    console.log('Error:', err);
  }
};

export const findNearbyFriends = (allFriends, location, radius) => {
  const nearbyFriends = [];
  allFriends.forEach((friend) => {
    // console.log('friend:', friend.first_name, friend.last_name);
    let distance = getDistanceFromUser(
      location.coords.latitude,
      location.coords.longitude,
      friend.latitude,
      friend.longitude
    );
    if (distance <= radius) {
      // console.log('nearby friend:', friend.first_name, friend.last_name);
      nearbyFriends.push(friend);
    }
  });
  return nearbyFriends;
};

function getDistanceFromUser(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = degToRad(lat2 - lat1);
  var dLon = degToRad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d * 1000; // to meters
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

export function adjustRadius(action, radius) {
  // console.log(action, radius);
  if (action === 'increase' && radius < 100000000000) {
    const radi = radius + 1609;
    return radi;
  } else if (action === 'decrease' && radius > 1609) {
    const radi = radius - 1609;
    return radi;
  } else {
    return radius;
  }
}
