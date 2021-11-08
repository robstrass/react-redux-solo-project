export const greetings = [
    'Bonjour, ',
    'Hola, ',
    'Zdravstvuyte, ',
    'Nǐ hǎo, ',
    'Caio, ',
    'Konnichiwa, ',
    'Oi, ',
    'Anyoung haseyo, ',
    'Asalaam alaikum, ',
    'Hej, Halløj, ',
    'Habari, ',
    'Hallo, ',
    'Yassou, ',
    'Dzień dobry, ',
    'Namaste, ',
    'Shalom, ',
    'God dag, ',
    'Grüß Gott, ',
    'Sawasdee, ',
    'Xin chào, ',
    'Schwmae, ',
    'Sawubona, ',
    'Hey there, ',
    'Hi, '
]

export const randomGreeting = (greetings) => {
    return greetings[Math.floor(Math.random() * greetings.length)];
};
