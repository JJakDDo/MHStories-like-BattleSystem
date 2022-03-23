window.onload = () => {
  let playerHP = 100;
  let monsterHP = 100;

  let playerAttackType = '';
  let monsterAttackType = '';
  const attackTypes = ['p', 's', 't'];

  const loginBtn = document.querySelector('#loginBtn');

  const currentPlayerHPBar_div = document.getElementById('currentPlayerHPBar');
  const currentMonsterHPBar_div = document.getElementById(
    'currentMonsterHPBar'
  );
  const currentPlayerHPNum_span = document.getElementById('currentPlayerHPNum');
  const currentMonsterHPNum_span = document.getElementById(
    'currentMonsterHPNum'
  );

  const powerAttack_div = document.getElementById('power');
  const speedAttack_div = document.getElementById('speed');
  const technicalAttack_div = document.getElementById('technical');

  const playerAttInitPos_div = document.getElementById(
    'playerInitAttackPosition'
  );
  const monsterAttInitPos_div = document.getElementById(
    'monsterInitAttackPosition'
  );

  const modal_div = document.getElementById('modal');
  const resultText_h = document.getElementById('resultText');
  const retry_div = document.getElementById('retry');

  let playerAttack;
  let monsterAttack;

  let isPARemoved = false;
  let isMARemoved = false;

  let isBattlePhase = false;

  let isGameOver = false;

  const HIDE = 'hide';
  const DISABLE = 'disable';

  const updateHPBar = () => {
    currentPlayerHPBar_div.style.width = `${playerHP}px`;
    currentMonsterHPBar_div.style.width = `${monsterHP}px`;
  };

  const updateHPNum = () => {
    currentPlayerHPNum_span.innerText = playerHP;
    currentMonsterHPNum_span.innerText = monsterHP;
  };

  const checkGameOver = () => {
    if (playerHP <= 0) {
      isGameOver = true;
      resultText_h.innerText = 'You lose...';
    }
    if (monsterHP <= 0) {
      isGameOver = true;
      resultText_h.innerText = 'You win!!!';
    }

    if (isGameOver) {
      modal_div.classList.remove(HIDE);
      powerAttack_div.classList.add(DISABLE);
      speedAttack_div.classList.add(DISABLE);
      technicalAttack_div.classList.add(DISABLE);
    }
  };

  const updateHP = () => {
    updateHPNum();
    updateHPBar();
    checkGameOver();
  };

  const getMonsterAttackType = () => {
    const rand = Math.floor(Math.random() * 3);
    return attackTypes[rand];
  };

  const attack = (result, playerLeft, monsterLeft) => {
    playerLeft += 5;
    monsterLeft -= 5;
    if (result === 'win') {
      if (!isMARemoved) {
        monsterAttack.style.setProperty(
          'transform',
          `translateX(${monsterLeft}px)`
        );
        if (
          monsterAttInitPos_div.offsetLeft + monsterLeft <=
          playerAttInitPos_div.offsetLeft + playerLeft
        ) {
          monsterAttInitPos_div.removeChild(monsterAttack);
          isMARemoved = true;
        }
      }
      if (!isPARemoved) {
        playerAttack.style.setProperty(
          'transform',
          `translateX(${playerLeft}px)`
        );
        if (
          playerLeft <
          monsterAttInitPos_div.offsetLeft - playerAttInitPos_div.offsetLeft
        ) {
          requestAnimationFrame(
            attack.bind(null, result, playerLeft, monsterLeft)
          );
        } else {
          playerAttInitPos_div.removeChild(playerAttack);
          isPARemoved = true;
          monsterHP -= 10;
          updateHP();
          isBattlePhase = false;
        }
      }
    } else if (result === 'lose') {
      if (!isPARemoved) {
        playerAttack.style.setProperty(
          'transform',
          `translateX(${playerLeft}px)`
        );
        if (
          playerAttInitPos_div.offsetLeft + playerLeft + 50 >=
          monsterAttInitPos_div.offsetLeft + monsterLeft
        ) {
          playerAttInitPos_div.removeChild(playerAttack);
          isPARemoved = true;
        }
      }
      if (!isMARemoved) {
        monsterAttack.style.setProperty(
          'transform',
          `translateX(${monsterLeft}px)`
        );
        if (
          monsterAttInitPos_div.offsetLeft + monsterLeft >
          playerAttInitPos_div.offsetLeft
        ) {
          requestAnimationFrame(
            attack.bind(null, result, playerLeft, monsterLeft)
          );
        } else {
          monsterAttInitPos_div.removeChild(monsterAttack);
          isMARemoved = true;
          playerHP -= 10;
          updateHP();
          isBattlePhase = false;
        }
      }
    } else if (result === 'draw') {
      if (!isPARemoved) {
        playerAttack.style.setProperty(
          'transform',
          `translateX(${playerLeft}px)`
        );
        if (
          playerAttInitPos_div.offsetLeft + playerLeft + 50 >=
          monsterAttInitPos_div.offsetLeft + monsterLeft
        ) {
          playerAttInitPos_div.removeChild(playerAttack);
          isPARemoved = true;
        }
      }
      if (!isMARemoved) {
        monsterAttack.style.setProperty(
          'transform',
          `translateX(${monsterLeft}px)`
        );
        if (
          monsterAttInitPos_div.offsetLeft + monsterLeft <=
          playerAttInitPos_div.offsetLeft + playerLeft + 50
        ) {
          monsterAttInitPos_div.removeChild(monsterAttack);
          isMARemoved = true;
          isBattlePhase = false;
        } else {
          requestAnimationFrame(
            attack.bind(null, result, playerLeft, monsterLeft)
          );
        }
      }
    }
  };

  const createAttack = (att1, att2) => {
    playerAttack = document.createElement('img');
    playerAttack.style.width = '50px';
    playerAttack.style.height = '50px';
    playerAttack.style.borderRadius = '50%';
    switch (att1) {
      case 'p':
        playerAttack.setAttribute('src', 'src/power.png');
        break;
      case 's':
        playerAttack.setAttribute('src', 'src/speed.png');
        break;
      case 't':
        playerAttack.setAttribute('src', 'src/technical.png');
        break;
    }
    playerAttInitPos_div.appendChild(playerAttack);

    monsterAttack = document.createElement('img');
    monsterAttack.style.width = '50px';
    monsterAttack.style.height = '50px';
    monsterAttack.style.borderRadius = '50%';
    switch (att2) {
      case 'p':
        monsterAttack.setAttribute('src', 'src/power.png');
        break;
      case 's':
        monsterAttack.setAttribute('src', 'src/speed.png');
        break;
      case 't':
        monsterAttack.setAttribute('src', 'src/technical.png');
        break;
    }
    monsterAttInitPos_div.appendChild(monsterAttack);

    isPARemoved = false;
    isMARemoved = false;
  };

  const startBattle = (result, att1, att2) => {
    console.log(result);
    let playerLeft = 0;
    let monsterLeft = 0;
    createAttack(att1, att2);
    requestAnimationFrame(attack.bind(null, result, playerLeft, monsterLeft));
  };

  const battlePhase = () => {
    isBattlePhase = true;
    monsterAttackType = getMonsterAttackType();
    switch (playerAttackType + monsterAttackType) {
      case 'pt':
      case 'ts':
      case 'sp':
        startBattle('win', playerAttackType, monsterAttackType);
        break;
      case 'tp':
      case 'st':
      case 'ps':
        startBattle('lose', playerAttackType, monsterAttackType);
        break;
      case 'pp':
      case 'ss':
      case 'tt':
        startBattle('draw', playerAttackType, monsterAttackType);
        break;
    }
  };

  const init = (account) => {
    document.querySelector('#login').setAttribute('style', 'display: none;');
    document.querySelector('#mainPage').classList.remove('hide');

    const address = document.querySelector('#address');
    address.textContent = account;
    updateHP();
    powerAttack_div.addEventListener('click', () => {
      if (!isBattlePhase) {
        playerAttackType = 'p';
        battlePhase();
      }
    });
    speedAttack_div.addEventListener('click', () => {
      if (!isBattlePhase) {
        playerAttackType = 's';
        battlePhase();
      }
    });
    technicalAttack_div.addEventListener('click', () => {
      if (!isBattlePhase) {
        playerAttackType = 't';
        battlePhase();
      }
    });
    retry_div.addEventListener('click', () => {
      modal_div.classList.add(HIDE);
      powerAttack_div.classList.remove(DISABLE);
      speedAttack_div.classList.remove(DISABLE);
      technicalAttack_div.classList.remove(DISABLE);
      playerHP = 100;
      monsterHP = 100;
      isGameOver = false;
      updateHPNum();
      updateHPBar();
    });
  };

  const login = () => {
    if (typeof ethereum !== 'undefined') {
      loginBtn.addEventListener('click', async () => {
        web3 = new Web3(ethereum);
        //const accounts = await ethereum.request({ method: 'eth_accounts' });
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        init(accounts[0]);
      });
    } else {
      console.log('MetaMask is uninstalled!');
      return;
    }
  };

  login();

  //requestAnimationFrame(attack, "win");
};
