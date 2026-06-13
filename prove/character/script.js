const character = {
    name: 'Snortleblat',
    class: 'Warrior',
    level: 5,
    health: 100,
    image: 'images/snortleblat.webp',

    attacked: function () {
        if (this.health <= 0) {
            return;
        }
        this.health -= 20;
        if (this.health <= 0) {
            this.health = 0;
            alert(`${this.name} has died!`);
        }
        render();
    },

    levelUp: function () {
        this.level += 1;
        render();
    }
};

function render() {
    document.querySelector('#charName').textContent = character.name;
    document.querySelector('#charClass').textContent = `Class: ${character.class}`;
    document.querySelector('#charLevel').textContent = `Level: ${character.level}`;
    document.querySelector('#charHealth').textContent = `Health: ${character.health}`;
    document.querySelector('#charImage').setAttribute('src', character.image);
    document.querySelector('#charImage').setAttribute('alt', character.name);
}

render();

document.querySelector('#attackBtn').addEventListener('click', function () {
    character.attacked();
});

document.querySelector('#levelUpBtn').addEventListener('click', function () {
    character.levelUp();
});