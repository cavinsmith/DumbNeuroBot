Dymb Neuro bot
==================
Бот для тупых нейронных сетей

Установка
---------

Требуется питон 2.* и [tensorflow](https://www.tensorflow.org/install/install_linux):
```bash
pip install tensorflow
```
Обучение
--------
Всё как в https://github.com/hunkim/word-rnn-tensorflow без изменений - положить в `neuro\data\tinyshakespeare` 
файл input.txt в формате txt (внезапно!)

Затем:

To train with default parameters on the tinyshakespeare corpus, run:
```bash
python train.py
```
To sample from a trained model
```bash
python sample.py
```
To pick using beam search, use the --pick parameter. Beam search can be further customized using the --width parameter, which sets the number of beams to search with. For example:
```bash
python sample.py --pick 2 --width 4
```
Настройка
---------
В config.json прописать токен для телеграмма