import { DEFAULT_LIMIT, DEFAULT_PAGE } from 'containers/constants';

let USERS = [
  {
    firstName: 'Serena',
    lastName: 'Juckes',
    email: 'sjuckes0@forbes.com',
  },
  {
    firstName: 'Trevor',
    lastName: 'Shernock',
    email: 'tshernock1@google.nl',
  },
  {
    firstName: 'Rutter',
    lastName: 'Gibling',
    email: 'rgibling2@networksolutions.com',
  },
  {
    firstName: 'Vinni',
    lastName: 'Osan',
    email: 'vosan3@usda.gov',
  },
  {
    firstName: 'Conrad',
    lastName: 'Fold',
    email: 'cfold4@forbes.com',
  },
  {
    firstName: 'Doti',
    lastName: 'Casper',
    email: 'dcasper5@rediff.com',
  },
  {
    firstName: 'Cordelia',
    lastName: 'Jonuzi',
    email: 'cjonuzi6@blog.com',
  },
  {
    firstName: 'Layney',
    lastName: 'Abrahmovici',
    email: 'labrahmovici7@hhs.gov',
  },
  {
    firstName: 'Mark',
    lastName: 'Yu',
    email: 'myu8@quantcast.com',
  },
  {
    firstName: 'Dallis',
    lastName: 'Coulston',
    email: 'dcoulston9@marriott.com',
  },
  {
    firstName: 'Sammy',
    lastName: 'Harbertson',
    email: 'sharbertsona@cbslocal.com',
  },
  {
    firstName: 'Vanya',
    lastName: 'Avard',
    email: 'vavardb@simplemachines.org',
  },
  {
    firstName: 'Haven',
    lastName: 'Enoch',
    email: 'henochc@cnbc.com',
  },
  {
    firstName: 'Delinda',
    lastName: 'Evetts',
    email: 'devettsd@digg.com',
  },
  {
    firstName: 'Correy',
    lastName: 'Luten',
    email: 'clutene@columbia.edu',
  },
  {
    firstName: 'Gayel',
    lastName: 'Autrie',
    email: 'gautrief@sitemeter.com',
  },
  {
    firstName: 'Cristen',
    lastName: 'Kenion',
    email: 'ckeniong@unblog.fr',
  },
  {
    firstName: 'Fabiano',
    lastName: 'Helwig',
    email: 'fhelwigh@amazonaws.com',
  },
  {
    firstName: 'Judi',
    lastName: 'Yele',
    email: 'jyelei@ocn.ne.jp',
  },
  {
    firstName: 'Kermy',
    lastName: 'Seary',
    email: 'ksearyj@google.co.jp',
  },
  {
    firstName: 'Alyda',
    lastName: 'Harrisson',
    email: 'aharrissonk@usa.gov',
  },
  {
    firstName: 'Ortensia',
    lastName: 'Boullin',
    email: 'oboullinl@nps.gov',
  },
  {
    firstName: 'Fredia',
    lastName: 'Vinnicombe',
    email: 'fvinnicombem@linkedin.com',
  },
  {
    firstName: 'Danila',
    lastName: 'Callacher',
    email: 'dcallachern@state.gov',
  },
  {
    firstName: 'Arielle',
    lastName: 'Aylwin',
    email: 'aaylwino@shop-pro.jp',
  },
  {
    firstName: 'Bernardo',
    lastName: 'Graeme',
    email: 'bgraemep@so-net.ne.jp',
  },
  {
    firstName: 'Dee',
    lastName: 'Longhi',
    email: 'dlonghiq@scientificamerican.com',
  },
  {
    firstName: 'Giorgi',
    lastName: 'Newland',
    email: 'gnewlandr@yahoo.com',
  },
  {
    firstName: 'Ferdie',
    lastName: 'Leindecker',
    email: 'fleindeckers@boston.com',
  },
  {
    firstName: 'Matt',
    lastName: 'Jiggins',
    email: 'mjigginst@yellowbook.com',
  },
  {
    firstName: 'Ignacius',
    lastName: 'Bote',
    email: 'iboteu@house.gov',
  },
  {
    firstName: 'Keith',
    lastName: 'Matthis',
    email: 'kmatthisv@redcross.org',
  },
  {
    firstName: 'Charil',
    lastName: 'Cabell',
    email: 'ccabellw@wikimedia.org',
  },
  {
    firstName: 'Virgina',
    lastName: 'Bellocht',
    email: 'vbellochtx@hatena.ne.jp',
  },
  {
    firstName: 'Vladimir',
    lastName: 'Georges',
    email: 'vgeorgesy@reddit.com',
  },
  {
    firstName: 'Nanni',
    lastName: 'Harlett',
    email: 'nharlettz@economist.com',
  },
  {
    firstName: 'Ignazio',
    lastName: 'Kinworthy',
    email: 'ikinworthy10@noaa.gov',
  },
  {
    firstName: 'Rudyard',
    lastName: 'Joffe',
    email: 'rjoffe11@amazon.com',
  },
  {
    firstName: 'Lyn',
    lastName: 'Jills',
    email: 'ljills12@hugedomains.com',
  },
  {
    firstName: 'Cleon',
    lastName: 'Baddow',
    email: 'cbaddow13@printfriendly.com',
  },
  {
    firstName: 'Dolly',
    lastName: 'Gouldthorpe',
    email: 'dgouldthorpe14@webeden.co.uk',
  },
  {
    firstName: 'Everard',
    lastName: 'Yoxall',
    email: 'eyoxall15@hhs.gov',
  },
  {
    firstName: 'Dorice',
    lastName: 'Barrable',
    email: 'dbarrable16@hexun.com',
  },
  {
    firstName: 'Kordula',
    lastName: 'Bretland',
    email: 'kbretland17@w3.org',
  },
  {
    firstName: 'Cozmo',
    lastName: 'McMinn',
    email: 'cmcminn18@a8.net',
  },
  {
    firstName: 'Jacki',
    lastName: 'Beak',
    email: 'jbeak19@odnoklassniki.ru',
  },
  {
    firstName: 'Shirleen',
    lastName: 'Rockwell',
    email: 'srockwell1a@ibm.com',
  },
  {
    firstName: 'Collin',
    lastName: 'Roberds',
    email: 'croberds1b@shareasale.com',
  },
  {
    firstName: 'Amye',
    lastName: 'Lohmeyer',
    email: 'alohmeyer1c@psu.edu',
  },
  {
    firstName: 'Marchelle',
    lastName: 'Vergine',
    email: 'mvergine1d@unblog.fr',
  },
  {
    firstName: 'Dodi',
    lastName: 'Henryson',
    email: 'dhenryson1e@amazon.de',
  },
  {
    firstName: 'Mandi',
    lastName: 'Mardy',
    email: 'mmardy1f@sciencedirect.com',
  },
  {
    firstName: 'Alva',
    lastName: 'Eaklee',
    email: 'aeaklee1g@bloglovin.com',
  },
  {
    firstName: 'Karalee',
    lastName: 'Morris',
    email: 'kmorris1h@de.vu',
  },
  {
    firstName: 'Michail',
    lastName: 'Fullstone',
    email: 'mfullstone1i@timesonline.co.uk',
  },
  {
    firstName: 'Carolus',
    lastName: 'Hallatt',
    email: 'challatt1j@cloudflare.com',
  },
  {
    firstName: 'Garreth',
    lastName: 'Carlile',
    email: 'gcarlile1k@w3.org',
  },
  {
    firstName: 'Cornelia',
    lastName: 'Hoggin',
    email: 'choggin1l@ustream.tv',
  },
  {
    firstName: 'Christian',
    lastName: 'Heindl',
    email: 'cheindl1m@slashdot.org',
  },
  {
    firstName: 'Vikky',
    lastName: 'Batman',
    email: 'vbatman1n@tinypic.com',
  },
  {
    firstName: 'Hilary',
    lastName: 'Mart',
    email: 'hmart1o@sun.com',
  },
  {
    firstName: 'Madelina',
    lastName: 'Pegg',
    email: 'mpegg1p@dell.com',
  },
  {
    firstName: 'Gene',
    lastName: 'Jemmett',
    email: 'gjemmett1q@miibeian.gov.cn',
  },
  {
    firstName: 'Ric',
    lastName: 'Charge',
    email: 'rcharge1r@msu.edu',
  },
  {
    firstName: 'Dorice',
    lastName: 'Ludmann',
    email: 'dludmann1s@ibm.com',
  },
  {
    firstName: 'Oswell',
    lastName: 'Bayliss',
    email: 'obayliss1t@tumblr.com',
  },
  {
    firstName: 'Ronni',
    lastName: 'Hindrick',
    email: 'rhindrick1u@seesaa.net',
  },
  {
    firstName: 'Ranique',
    lastName: 'Tippings',
    email: 'rtippings1v@dion.ne.jp',
  },
  {
    firstName: 'Gunar',
    lastName: 'Fowlie',
    email: 'gfowlie1w@imdb.com',
  },
  {
    firstName: 'Archibaldo',
    lastName: 'Niblo',
    email: 'aniblo1x@usa.gov',
  },
  {
    firstName: 'Bogart',
    lastName: 'Law',
    email: 'blaw1y@hatena.ne.jp',
  },
  {
    firstName: 'Gaston',
    lastName: 'Dunsford',
    email: 'gdunsford1z@google.it',
  },
  {
    firstName: 'Maris',
    lastName: 'Goncaves',
    email: 'mgoncaves20@yolasite.com',
  },
  {
    firstName: 'Dyna',
    lastName: 'Blamey',
    email: 'dblamey21@technorati.com',
  },
  {
    firstName: 'Ernaline',
    lastName: 'Jefford',
    email: 'ejefford22@virginia.edu',
  },
  {
    firstName: 'Tilda',
    lastName: 'Corking',
    email: 'tcorking23@scientificamerican.com',
  },
  {
    firstName: 'Brynn',
    lastName: 'Woolner',
    email: 'bwoolner24@npr.org',
  },
  {
    firstName: 'Kimball',
    lastName: 'Rimes',
    email: 'krimes25@nps.gov',
  },
  {
    firstName: 'Jess',
    lastName: 'Virgo',
    email: 'jvirgo26@rambler.ru',
  },
  {
    firstName: 'Byrle',
    lastName: 'Cromblehome',
    email: 'bcromblehome27@tumblr.com',
  },
  {
    firstName: 'Janette',
    lastName: 'Beviss',
    email: 'jbeviss28@bravesites.com',
  },
  {
    firstName: 'Natale',
    lastName: 'Musto',
    email: 'nmusto29@dell.com',
  },
  {
    firstName: 'Sarah',
    lastName: 'Tregale',
    email: 'stregale2a@aboutads.info',
  },
  {
    firstName: 'Cornela',
    lastName: 'Gilhouley',
    email: 'cgilhouley2b@omniture.com',
  },
  {
    firstName: 'Reeta',
    lastName: 'Fergie',
    email: 'rfergie2c@seesaa.net',
  },
  {
    firstName: 'Abigael',
    lastName: 'Bluschke',
    email: 'abluschke2d@webmd.com',
  },
  {
    firstName: 'Freddie',
    lastName: 'Widdup',
    email: 'fwiddup2e@sourceforge.net',
  },
  {
    firstName: 'Lanna',
    lastName: 'Clausen',
    email: 'lclausen2f@epa.gov',
  },
  {
    firstName: 'Russell',
    lastName: 'Runsey',
    email: 'rrunsey2g@mozilla.com',
  },
  {
    firstName: 'Kippy',
    lastName: 'Krollmann',
    email: 'kkrollmann2h@ucoz.com',
  },
  {
    firstName: 'Brod',
    lastName: 'Damsell',
    email: 'bdamsell2i@rambler.ru',
  },
  {
    firstName: 'Herculie',
    lastName: 'Llewhellin',
    email: 'hllewhellin2j@lycos.com',
  },
  {
    firstName: 'Tallie',
    lastName: 'Ceschelli',
    email: 'tceschelli2k@apache.org',
  },
  {
    firstName: 'Jeri',
    lastName: 'Gosnell',
    email: 'jgosnell2l@weebly.com',
  },
  {
    firstName: 'Dagmar',
    lastName: 'Miettinen',
    email: 'dmiettinen2m@last.fm',
  },
  {
    firstName: 'Etan',
    lastName: 'Reaney',
    email: 'ereaney2n@ibm.com',
  },
  {
    firstName: 'Olympie',
    lastName: 'Doreward',
    email: 'odoreward2o@google.cn',
  },
  {
    firstName: 'Barton',
    lastName: 'Shipcott',
    email: 'bshipcott2p@foxnews.com',
  },
  {
    firstName: 'Nelly',
    lastName: 'Whetland',
    email: 'nwhetland2q@usa.gov',
  },
  {
    firstName: 'Avictor',
    lastName: 'Gallagher',
    email: 'agallagher2r@uiuc.edu',
  },
].map((user, i) => {
  const updatedUser = user;
  updatedUser.profileUrl = 'https://thispersondoesnotexist.com/image';
  updatedUser.lastAccessDate = new Date();
  updatedUser.verified = true;
  updatedUser.status = i % 2 === 0 ? 'Active' : 'Suspended';
  updatedUser.id = i + 1;

  return updatedUser;
});

const getSortedUsers = (sortType, sortKey, allUsers) => {
  const updatedSortKey = sortKey;
  try {
    return allUsers.sort((user1, user2) => {
      if (updatedSortKey === 'id') {
        return sortType === 1
          ? user1[updatedSortKey] - user2[updatedSortKey]
          : user2[updatedSortKey] - user1[updatedSortKey];
      }

      return sortType === 1
        ? user1[updatedSortKey].localeCompare(user2[updatedSortKey])
        : user2[updatedSortKey].localeCompare(user1[updatedSortKey]);
    });
  } catch (error) {
    return allUsers;
  }
};

export const getUsersAPIMock = ({
  limit = DEFAULT_LIMIT,
  skip = DEFAULT_PAGE,
  sortType,
  sortKey,
  search,
  status,
} = {}) => {
  const users = [];
  const skipIndexs = (skip - 1) * limit;
  let allUsers = USERS;
  allUsers = getSortedUsers(sortType, sortKey, allUsers);

  const contains = (parentObject, key, term) =>
    parentObject[key].toLocaleLowerCase().includes(term.toLocaleLowerCase());

  if (search) {
    allUsers = allUsers.filter(
      user =>
        contains(user, 'firstName', search) ||
        contains(user, 'lastName', search) ||
        contains(user, 'email', search),
    );
  }

  if (status) {
    allUsers = allUsers.filter(user => user.status === status);
  }
  // eslint-disable-next-line no-plusplus
  for (let index = skipIndexs; index < allUsers.length; index++) {
    if (users.length === limit) {
      break;
    }

    users.push(allUsers[index]);
  }

  return Promise.resolve({
    data: users,
    pagination: {
      pageSize: limit,
      current: skip,
      total: allUsers.length,
    },
    status: 1,
  });
};

export const deleteUserAPIMock = id => {
  USERS = USERS.filter(user => user.id !== id);

  return Promise.resolve({
    status: 1,
    message: 'Deleted',
  });
};

export const updateUserAPIMock = (payload, newRecord) => {
  if (newRecord) {
    USERS.push({
      ...payload,
      id: USERS.length + 1,
    });
  } else {
    USERS = USERS.map(user => {
      let updatedUser = user;
      if (updatedUser.id === payload.id) {
        updatedUser = { ...user, ...payload };
      }

      return updatedUser;
    });
  }
  return Promise.resolve({
    status: 1,
    message: 'Success',
  });
};

export const USER_DATA = {
  EMAIL: 'it@growexx.com',
  URL: 'https://growexx.atlassian.net',
  NAME: 'GrowExx',
  _ID: '60631fbe96e98c33713f7000',
};

export const responseWithZeroList = () => ({
  data: [],
  pagination: {
    pageSize: DEFAULT_LIMIT,
    current: DEFAULT_PAGE,
    total: 0,
  },
  status: 1,
});

export const responseWithList = ({ status } = {}) => ({
  data: USERS.splice(0, DEFAULT_LIMIT),
  pagination: {
    pageSize: DEFAULT_LIMIT,
    current: DEFAULT_PAGE,
    total: USERS.length,
  },
  status: status || 1,
});

export const failedResponse = {
  data: null,
  status: 0,
  message: 'You do not have access',
};

// Add | Edit
export const addNewUserFailure = () => ({
  response: {},
});

export const addNewUserSuccess = () => ({
  message: 'Done',
  status: 1,
});
