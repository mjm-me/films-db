SELECT \* FROM movies.films;

En realidad creo que lo vale es esto:

USE movies;
INSERT INTO films (film_id, updatedAt, description, title, release_year, director, duration, rating, poster)
VALUES
( UUID(), now(), '' , 'The Shawshank Redemption', 1995, 'Frank Darabont', 142, 9.3, 'https://www.imdb.com/title/tt0111161/'),
( UUID(), now(), '' , 'The Godfather', 1971, 'Francis Ford Coppola', 175, 9.2, 'https://www.imdb.com/title/tt0068646/'),
( UUID(), now(), '' , 'The Dark Knight', 2007, 'Christopher Nolan', 152, 9.0, 'https://www.imdb.com/title/tt0468569/'),
( UUID(), now(), '' , 'The Lord of the Rings: The Return of the King', 2002, 'Peter Jackson', 201, 8.9, 'https://www.imdb.com/title/tt0167260/'),
( UUID(), now(), '' , 'Pulp Fiction', 1993, 'Quentin Tarantino', 154, 8.9, 'https://www.imdb.com/title/tt0110912/'),
( UUID(), now(), '' , 'Schindler''s List', 1992, 'Steven Spielberg', 195, 8.9, 'https://www.imdb.com/title/tt0108052/'),
( UUID(), now(), '' , 'The Lord of the Rings: The Fellowship of the Ring', 2000, 'Peter Jackson', 178, 8.8, 'https://www.imdb.com/title/tt0120737/'),
( UUID(), now(), '' , 'Forrest Gump', 1995, 'Robert Zemeckis', 142, 8.8, 'https://www.imdb.com/title/tt0109830/'),
( UUID(), now(), '' , 'Inception', 2011, 'Christopher Nolan', 148, 8.7, 'https://www.imdb.com/title/tt1375666/'),
( UUID(), now(), '' , 'The Lord of the Rings: The Two Towers', 2003, 'Peter Jackson', 179, 8.7, 'https://www.imdb.com/title/tt0167261/'),
( UUID(), now(), '' , 'The Matrix', 1998, 'Lana Wachowski, Lilly Wachowski', 136, 8.7, 'https://www.imdb.com/title/tt0133093/'),
( UUID(), now(), '' , 'Goodfellas', 1991, 'Martin Scorsese', 146, 8.7, 'https://www.imdb.com/title/tt0099685/'),
( UUID(), now(), '' , 'One Flew Over the Cuckoo''s Nest', 194, 'Milos Forman', 133, 8.7, 'https://www.imdb.com/title/tt0073486/'),
( UUID(), now(), '' , 'Seven', 1994, 'David Fincher', 127, 8.6, 'https://www.imdb.com/title/tt0114369/'),
( UUID(), now(), '' , 'The Silence of the Lambs', 1990, 'Jonathan Demme', 118, 8.6, 'https://www.imdb.com/title/tt0102926/'),
( UUID(), now(), '' , 'The Usual Suspects', 1994, 'Bryan Singer', 106, 8.5, 'https://www.imdb.com/title/tt0114814/'),
( UUID(), now(), '' , 'Léon: The Professional', 1993, 'Luc Besson', 110, 8.5, 'https://www.imdb.com/title/tt0110413/'),
( UUID(), now(), '' , 'The Lion King', 1992, 'Roger Allers, Rob Minkoff', 88, 8.5, 'https://www.imdb.com/title/tt0110357/'),
( UUID(), now(), '' , 'Terminator 2: Judgment Day', 1990, 'James Cameron', 137, 8.5, 'https://www.imdb.com/title/tt0103064/'),
( UUID(), now(), '' , 'Saving Private Ryan', 1994, 'Steven Spielberg', 169, 8.5, 'https://www.imdb.com/title/tt0120815/'),
( UUID(), now(), '' , 'The Green Mile', 1997, 'Frank Darabont', 189, 8.5, 'https://www.imdb.com/title/tt0120689/'),
( UUID(), now(), '' , 'Back to the Future', 1984, 'Robert Zemeckis', 116, 8.5, 'https://www.imdb.com/title/tt0088763/'),
( UUID(), now(), '' , 'American History X', 1997, 'Tony Kaye', 119, 8.5, 'https://www.imdb.com/title/tt0120586/'),
( UUID(), now(), '' , 'The Pianist', 2000, 'Roman Polanski', 150, 8.5, 'https://www.imdb.com/title/tt0253474/'),
( UUID(), now(), '' , 'Gladiator', 2001, 'Ridley Scott', 155, 8.5, 'https://www.imdb.com/title/tt0172495/'),
( UUID(), now(), '' , 'The Departed', 2004, 'Martin Scorsese', 151, 8.5, 'https://www.imdb.com/title/tt0407887/'),
( UUID(), now(), '' , 'The Prestige', 2007, 'Christopher Nolan', 130, 8.5, 'https://www.imdb.com/title/tt0482571/'),
( UUID(), now(), '' , 'The Intouchables', 2010, 'Olivier Nakache, Éric Toledano', 112, 8.5, 'https://www.imdb.com/title/tt1675434/');
