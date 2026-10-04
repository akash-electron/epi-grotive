const u = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IMG = {
  // Engines section
  engineMedia: u("1560253023-3ec5d502959f"), // RGB production setup
  engineGaming: u("1542751371-adc38448a05e"), // gamer with headset
  // What We Deliver cards
  deliverEvent: u("1505373877841-8d25f7d46678", 600), // stage lights crowd
  deliverProduction: u("1587202372775-e229f172b9d7", 600), // pc build setup
  deliverCreatives: u("1511512578047-dfb367046420", 600), // neon arcade
  deliverInfluencer: u("1593305841991-05c297ba4575", 600), // gaming
  // Portfolio (2 rows x 4)
  portfolio: [
    u("1552820728-8b83bb6b773f", 600), // controller
    u("1550745165-9bc0b252726f", 600), // retro console
    u("1540039155733-5bb30b53aa14", 600), // concert crowd
    u("1470229722913-7c0e2dbbafd3", 600), // stage
    u("1519669556878-63bdad8a1a49", 600), // crowd
    u("1614294148960-9aa740632a87", 600), // dualsense
    u("1605901309584-818e25960a8f", 600), // neon setup
    u("1551103782-8ab07afd45c1", 600), // neon controller
  ],
};
