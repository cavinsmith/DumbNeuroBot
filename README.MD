Dumb Neuro bot
==================
Бот для тупых нейронных сетей на основе [word-rnn-tensorflow](https://github.com/hunkim/word-rnn-tensorflow).

Установка
---------

Требуется питон 2.* и [tensorflow](https://www.tensorflow.org/install/install_linux):
```bash
pip install tensorflow
```
Обучение
--------
Всё как в https://github.com/hunkim/word-rnn-tensorflow без изменений - положить в `some_dir` 
файл input.txt в формате txt (внезапно!)

Затем перейти в директорию `neuro`, где лежит сама нейросеть.

Затем
```bash
python train.py --data_dir some_dir
```
To sample from a trained model
```bash
python sample.py
```
To pick using beam search, use the --pick parameter. Beam search can be further customized using the --width parameter, which sets the number of beams to search with. For example:
```bash
python sample.py --pick 2 --width 4
```
Настройка бота
---------
Скопировать `config.json` из `config.sample.json`, в `config.json` прописать токен для телеграмма.