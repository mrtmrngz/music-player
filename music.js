class Music{
    constructor(title, singer, image, file) {
        this.title = title
        this.singer = singer
        this.image = image
        this.file = file
    }

    getName() {
        return `${this.title} - ${this.singer}`
    }

}


let musicList = [
    new Music("Fell For A Demon", "ROY KNOX & LINKER", "fell-for-a-demon.png", "fell-for-a-demon.mp3"),
    new Music("On Your Mind", "Ripple", "on-your-mind.png", "on-your-mind.mp3"),
    new Music("Move Your Body", "3rd Prototype", "move-your-body.png", "move-your-body.mp3"),
    new Music("Romeo and Juliet", "SadBois & Manno", "romeo-and-juliet.png", "romeo-and-juliet.mp3"),
]