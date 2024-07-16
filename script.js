let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["木棍"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: '木棍', power: 5 },
  { name: '匕首', power: 30 },
  { name: '爪锤', power: 50 },
  { name: '剑', power: 100 }
];
const monsters = [
  {
    name: "史莱姆",
    level: 2,
    health: 15
  },
  {
    name: "尖牙兽",
    level: 8,
    health: 60
  },
  {
    name: "龙",
    level: 20,
    health: 300
  }
];
const locations = [
  {
    name: "城镇广场",
    "button text": ["前往商店", "前往洞穴", "与龙战斗"],
    "button functions": [goStore, goCave, fightDragon],
    text: "你在城镇广场。你看到一个指向'商店'的牌子。"
  },
  {
    name: "商店",
    "button text": ["购买10生命值（10金币）", "购买武器（30金币）", "返回城镇广场"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "你进入了商店。"
  },
  {
    name: "洞穴",
    "button text": ["与史莱姆战斗", "与尖牙兽战斗", "返回城镇广场"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "你进入了洞穴。你看到一些怪物。"
  },
  {
    name: "战斗",
    "button text": ["攻击", "躲避", "逃跑"],
    "button functions": [attack, dodge, goTown],
    text: "你正在与一个怪物战斗。"
  },
  {
    name: "击败怪物",
    "button text": ["返回城镇广场", "返回城镇广场", "返回城镇广场"],
    "button functions": [goTown, goTown, easterEgg],
    text: "怪物在死前尖叫'啊！'。你获得了经验值并找到了金币。"
  },
  {
    name: "失败",
    "button text": ["重新开始？", "重新开始？", "重新开始？"],
    "button functions": [restart, restart, restart],
    text: "你死了。☠️"
  },
  {
    name: "胜利",
    "button text": ["重新开始？", "重新开始？", "重新开始？"],
    "button functions": [restart, restart, restart],
    text: "你击败了龙！你赢得了游戏！🎉"
  },
  {
    name: "复活节彩蛋",
    "button text": ["2", "8", "返回城镇广场？"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "你发现了一个秘密游戏。选择上面的一个数字。将随机选择十个0到10之间的数字。如果你选择的数字与随机数字之一匹配，你就赢了！"
  }
];

// 绑定按钮点击事件
button1.onclick = goStore; // 绑定前往商店事件
button2.onclick = goCave;  // 绑定前往洞穴事件
button3.onclick = fightDragon; // 绑定与龙战斗事件

function update(location) {
  monsterStats.style.display = "none"; // 隐藏怪物状态
  button1.innerText = location["button text"][0]; // 设置按钮文本
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0]; // 绑定按钮点击事件
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text; // 更新文本内容
}

function goTown() {
  update(locations[0]); // 更新为城镇广场的场景
}

function goStore() {
  update(locations[1]); // 更新为商店的场景
}

function goCave() {
  update(locations[2]); // 更新为洞穴的场景
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "你的金币不足以购买生命值。";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "你现在拥有了一把 " + newWeapon + "。";
      inventory.push(newWeapon);
      text.innerText += " 你的背包中有：" + inventory;
    } else {
      text.innerText = "你的金币不足以购买武器。";
    }
  } else {
    text.innerText = "你已经有了最强大的武器！";
    button2.innerText = "以15金币出售武器";
    button2.onclick = sellWeapon; // 绑定出售武器事件
  }
}

function sellWeapon() {
    if (inventory.length > 1) {
      gold += 15;
      goldText.innerText = gold;
      let currentWeapon = inventory.shift();
      text.innerText = "你出售了一把 " + currentWeapon + "。";
      text.innerText += " 你的背包中有：" + inventory;
    } else {
      text.innerText = "不要出售你唯一的武器！";
    }
  }
  
  function fightSlime() {
    fighting = 0;
    goFight();
  }
  
  function fightBeast() {
    fighting = 1;
    goFight();
  }
  
  function fightDragon() {
    fighting = 2;
    goFight();
  }
  
  function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
  }
  
  function attack() {
    text.innerText = monsters[fighting].name + " 发起了攻击。";
    text.innerText += " 你使用你的 " + weapons[currentWeapon].name + " 进行反击。";
    health -= getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()) {
      monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
    } else {
      text.innerText += " 你未击中。";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
      lose();
    } else if (monsterHealth <= 0) {
      if (fighting === 2) {
        winGame();
      } else {
        defeatMonster();
      }
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
      text.innerText += " 你的 " + inventory.pop() + " 损坏了。";
      currentWeapon--;
    }
  }

  function getMonsterAttackValue(level) {
    const 伤害值 = (level * 5) - Math.floor(Math.random() * xp);
    console.log(伤害值);
    return 伤害值 > 0 ? 伤害值 : 0;
  }
  
  function isMonsterHit() {
    // 怪物击中逻辑：有80%的概率未击中，或者玩家生命值小于20时必定击中
    return Math.random() > 0.2 || health < 20;
  }
  
  function dodge() {
    text.innerText = "你躲避了来自" + monsters[fighting].name + "的攻击";
  }
  
  function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7); // 获得金币
    xp += monsters[fighting].level; // 获得经验值
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]); // 更新到击败怪物后的场景
  }
  
  function lose() {
    update(locations[5]); // 更新到游戏失败的场景
  }
  
  function winGame() {
    update(locations[6]); // 更新到游戏胜利的场景
  }
  
  function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["木棍"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown(); // 重置游戏状态并返回城镇广场
  }
  
  function easterEgg() {
    update(locations[7]); // 更新到复活节彩蛋场景
  }
  
  function pickTwo() {
    pick(2);
  }
  
  function pickEight() {
    pick(8);
  }
  
  function pick(猜测) {
    const numbers = [];
    while (numbers.length < 10) {
      numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "你选择了 " + 猜测 + ". 以下是随机数字：\n";
    for (let i = 0; i < 10; i++) {
      text.innerText += numbers[i] + "\n";
    }
    if (numbers.includes(猜测)) {
      text.innerText += "正确！你赢得了20金币！";
      gold += 20;
      goldText.innerText = gold;
    } else {
      text.innerText += "错误！你失去了10生命值！";
      health -= 10;
      healthText.innerText = health;
      if (health <= 0) {
        lose(); // 如果生命值小于等于0，则游戏失败
      }
    }
  }