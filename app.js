window.onload = () => {
    let playerHP = 100;
    let monsterHP = 100;

    let playerAttackType = "";
    let monsterAttackType = "";
    const attackTypes = ["p", "s", "t"];

    const currentPlayerHPBar_div = document.getElementById("currentPlayerHPBar");
    const currentMonsterHPBar_div = document.getElementById("currentMonsterHPBar");
    const currentPlayerHPNum_span = document.getElementById("currentPlayerHPNum");
    const currentMonsterHPNum_span = document.getElementById("currentMonsterHPNum");

    const powerAttack_div = document.getElementById("power");
    const speedAttack_div = document.getElementById("speed");
    const technicalAttack_div = document.getElementById("technical");

    const playerAttInitPos_div = document.getElementById("playerInitAttackPosition");
    const monsterAttInitPos_div = document.getElementById("monsterInitAttackPosition");

    let playerAttack;
    let monsterAttack;

    let isPARemoved = false;
    let isMARemoved = false;

    const updateHPBar = () => {
        currentPlayerHPBar_div.style.width = `${playerHP}px`;
        currentMonsterHPBar_div.style.width = `${monsterHP}px`;
    }

    const updateHPNum = () => {
        currentPlayerHPNum_span.innerText = playerHP;
        currentMonsterHPNum_span.innerText = monsterHP;
    }

    const updateHP = () => {
        updateHPNum();
        updateHPBar();
    }

    const getMonsterAttackType = () => {
        const rand = Math.floor(Math.random() * 3);
        return attackTypes[rand];
    }

    const attack = (result, playerLeft, monsterLeft) => {
        playerLeft += 5;
        monsterLeft -= 5;
        if(result === "win"){
            if(!isMARemoved){
                monsterAttack.style.setProperty("transform", `translateX(${monsterLeft}px)`);
                if(monsterAttInitPos_div.offsetLeft + monsterLeft <= playerAttInitPos_div.offsetLeft + playerLeft){
                    monsterAttInitPos_div.removeChild(monsterAttack);
                    isMARemoved = true;
                }
            }
            if(!isPARemoved){
                playerAttack.style.setProperty("transform", `translateX(${playerLeft}px)`);
                if(playerLeft < monsterAttInitPos_div.offsetLeft - playerAttInitPos_div.offsetLeft){
                    requestAnimationFrame(attack.bind(null, result, playerLeft, monsterLeft));
                } else {
                    playerAttInitPos_div.removeChild(playerAttack);
                    isPARemoved = true;
                    monsterHP -= 10;
                    updateHP();
                }
            }
        } else if(result === "lose"){
            if(!isPARemoved){
                playerAttack.style.setProperty("transform", `translateX(${playerLeft}px)`);
                if(playerAttInitPos_div.offsetLeft + playerLeft + 50 >= monsterAttInitPos_div.offsetLeft + monsterLeft){
                    playerAttInitPos_div.removeChild(playerAttack);
                    isPARemoved = true;
                }
            }
            if(!isMARemoved){
                monsterAttack.style.setProperty("transform", `translateX(${monsterLeft}px)`);
                if(monsterAttInitPos_div.offsetLeft + monsterLeft > playerAttInitPos_div.offsetLeft){
                    requestAnimationFrame(attack.bind(null, result, playerLeft, monsterLeft));
                } else {
                    monsterAttInitPos_div.removeChild(monsterAttack);
                    isMARemoved = true;
                    playerHP -= 10;
                    updateHP();
                }
            }
        } else if(result === "draw"){
            if(!isPARemoved){
                playerAttack.style.setProperty("transform", `translateX(${playerLeft}px)`);
                if(playerAttInitPos_div.offsetLeft + playerLeft + 50 >= monsterAttInitPos_div.offsetLeft + monsterLeft){
                    playerAttInitPos_div.removeChild(playerAttack);
                    isPARemoved = true;
                }
            }
            if(!isMARemoved){
                monsterAttack.style.setProperty("transform", `translateX(${monsterLeft}px)`);
                if(monsterAttInitPos_div.offsetLeft + monsterLeft <= playerAttInitPos_div.offsetLeft + playerLeft + 50){
                    monsterAttInitPos_div.removeChild(monsterAttack);
                    isMARemoved = true;
                } else {
                    requestAnimationFrame(attack.bind(null, result, playerLeft, monsterLeft));
                }
            }
        }
    }

    const createAttack = (att1, att2) => {
        playerAttack = document.createElement("div");
        playerAttack.style.width = "50px";
        playerAttack.style.height = "50px";
        playerAttack.style.background = att1;
        playerAttInitPos_div.appendChild(playerAttack);
    
        monsterAttack = document.createElement("div");
        monsterAttack.style.width = "50px";
        monsterAttack.style.height = "50px";
        monsterAttack.style.background = att2;
        monsterAttInitPos_div.appendChild(monsterAttack);

        isPARemoved = false;
        isMARemoved = false;
    }

    const startBattle = (result, att1, att2) => {
        console.log(result);
        let aType1;
        let aType2;

        let playerLeft = 0;
        let monsterLeft = 0;

        switch(att1){
            case "p":
                aType1 = "crimson";
                break;
            case "s":
                aType1 = "skyblue";
                break;
            case "t":
                aType1 = "greenyellow";
                break;
        }
        switch(att2){
            case "p":
                aType2 = "crimson";
                break;
            case "s":
                aType2 = "skyblue";
                break;
            case "t":
                aType2 = "greenyellow";
                break;
        }
        createAttack(aType1, aType2);
        requestAnimationFrame(attack.bind(null, result, playerLeft, monsterLeft));
    }

    const battlePhase = () => {
        monsterAttackType = getMonsterAttackType();
        switch(playerAttackType + monsterAttackType){
            case "pt":
            case "ts":
            case "sp":
                startBattle("win", playerAttackType, monsterAttackType);
                break;
            case "tp":
            case "st":
            case "ps":
                startBattle("lose", playerAttackType, monsterAttackType);
                break;
            case "pp":
            case "ss":
            case "tt":
                startBattle("draw", playerAttackType, monsterAttackType);
                break;
        }
    }

    const init = () => {
        updateHP();
        powerAttack_div.addEventListener("click", () => {
            playerAttackType = "p";
            battlePhase();
        });
        speedAttack_div.addEventListener("click", () => {
            playerAttackType = "s";
            battlePhase();
        });
        technicalAttack_div.addEventListener("click", () => {
            playerAttackType = "t";
            battlePhase();
        });
    }

    init();

    //requestAnimationFrame(attack, "win");
};