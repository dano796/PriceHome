# -*- coding: utf-8 -*-
"""Copia de Copia de NEW_PriceHome.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1AWh5TRMW0VKq4XP_5iN4_3y9QopgR1xQ
"""

import json
import pandas as pd
import requests
import re
import time

import numpy as np  # matrices y vectores
import matplotlib.pyplot as plt #gráfica
from sklearn.preprocessing import MinMaxScaler

#Cargamos los datos
data = pd.read_csv("venta.csv")
data.head(900)

data['neighbourhood'].value_counts()

data.info()

data = data[data['rooms'] != 'Sin especificar']
data = data[data['baths'] != 'Sin especificar']
data = data.drop('property_id', axis=1)

data['garages'] = data['garages'].replace('Sin especificar', '0')
data['garages'] = data['garages'].replace('Más de 10', '11')
#Corrección de variables
data['area']=data['area'].astype('int64')
data['rooms']=data['rooms'].astype('int64')
data['garages']=data['garages'].astype('int64')

data['stratum']=data['stratum'].astype('category')
data['baths']=data['baths'].astype('int64')
data['price']=data['price'].astype('int64')
data['neighbourhood']=data['neighbourhood'].astype('category')
data['city']=data['city'].astype('category')

data.info()

data.describe()

data.plot(kind='box')

data = data[data['price'] < 1300000000]
data = data[data['area'] < 300]

data.plot(kind='box')

area= data['area']

plt.boxplot(area, vert=True)  # "vert=False" para un diagrama de caja horizontal
plt.xlabel('Area')  # Etiqueta del eje x (opcional)
plt.title('Diagrama de Caja para Area')  # Título del gráfico (opcional)
plt.show()

# Si es tipo 'category', conviértela a 'object' o 'string' para un filtrado más directo
if pd.api.types.is_categorical_dtype(data['property_type']):
    data['property_type'] = data['property_type'].astype('object')

# Verifica si la columna es de tipo 'category'
print(data['property_type'].dtype)

opciones_permitidas = ['Apartamento', 'Casa', 'Apartaestudio']
data = data[data['property_type'].isin(opciones_permitidas)]

data['property_type'].unique()

data.info()

#Sklearn sólo analiza variables numéricas
data = pd.get_dummies(data, columns=['is_new','stratum','property_type','neighbourhood','city'], drop_first=False)
data.head()

data = data.drop('stratum_Campestre', axis=1)

data.columns.unique()

#División 70-30
from sklearn.model_selection import train_test_split
X = data.drop("price", axis = 1) # Variables predictoras
Y = data['price'] #Variable objetivo
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.3)
Y_train.plot(kind='hist')

#Hiperparametrización
from sklearn.model_selection import GridSearchCV

#  Arbol
from sklearn.tree import DecisionTreeRegressor
modelTree = DecisionTreeRegressor()

# Definir los hiperparametros
criterion=['squared_error','absolute_error'] #Indice de información
min_samples_leaf=[2,10,50,80,100,130] # Cantidad de registros por hoja
max_depth=[None, 10,20, 50,80,100] #Niveles de profundidad

#Grid
param_grid = dict(criterion=criterion, min_samples_leaf=min_samples_leaf, max_depth=max_depth)
grid = GridSearchCV(estimator=modelTree, param_grid=param_grid, scoring='neg_mean_squared_error', n_jobs=-1, cv=3)
grid.fit(X_train, Y_train)

#Mejor modelo
modelTree= grid.best_estimator_

#Medida de evaluación del mejor modelo
medidas_CV= pd.DataFrame(index=['MSE'])
medidas_CV['Tree']=grid.best_score_

# Mejores párametros
print( grid.best_params_)

print(medidas_CV)

from sklearn.tree import plot_tree
plt.figure(figsize=(15,15))
plot_tree(modelTree, feature_names=X_train.columns.values, rounded=True, filled=True, fontsize=8)
plt.show()

#Normalizacion las variables numéricas (las dummies no se normalizan)
from sklearn.preprocessing import MinMaxScaler

min_max_scaler = MinMaxScaler()
variables_norm=['area',	'rooms','baths','garages']
min_max_scaler.fit(data[variables_norm]) #Ajuste de los parametros: max - min

#Se aplica la normalización a 70%  y el 30% se normaliza posteriormente
X_train[variables_norm]= min_max_scaler.transform(X_train[variables_norm]) #70%
X_train.head()

#Evaluación del árbol de regresión 30%
from sklearn import metrics

Y_pred = modelTree.predict(X_test) #30%

#Dataframe para comparar los resultados
medidas= pd.DataFrame(index=['mse','rmse','mae','mape','max'])

mse = metrics.mean_squared_error(Y_test,Y_pred)
rmse = np.sqrt(mse)
mae= metrics.mean_absolute_error(Y_test,Y_pred)
mape=metrics.mean_absolute_percentage_error(Y_test,Y_pred)
max=metrics.max_error(Y_test,Y_pred)
medidas['Arbol']=[mse, rmse, mae, mape,max]
print(medidas)

#Gráfica Valor Real vs Predicción
plt.scatter(Y_test, Y_pred)
plt.plot([Y_test.min(), Y_test.max()], [Y_test.min(), Y_test.max()],'k--', color = 'black', lw=2)
plt.xlabel('Valor real')
plt.ylabel('Valor del modelo')
plt.title('Valor Real vs Predicción Tree')
plt.show() # Mostrar la grafica luego de que ya se definio todos los elementos

#Se normaliza X_test para el resto de métodos
X_test[variables_norm]= min_max_scaler.transform(X_test[variables_norm])  #30%
X_test

medidas.round(1)

import pickle
filename = 'modeloVentasRealState.pkl'
variables= X.columns._values
pickle.dump([modelTree,variables,min_max_scaler], open(filename, 'wb')) #write