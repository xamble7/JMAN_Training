import logging
from abc import ABC, abstractmethod
from typing import Union

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

class DataStrategy(ABC):
    @abstractmethod
    def handle_data(self, data: pd.DataFrame) -> Union[pd.DataFrame,pd.Series]:
        pass


class DataPreRrocessStrategy(DataStrategy):
    def handle_data(self, data: pd.DataFrame) -> pd.DataFrame | pd.Series:
        try:
            data = data.drop([],axis=1) # Drop the columns which is not significant
            # Fill null values 
        except Exception as e:
            logging.error(f"Error in preprocessing Data: {e}")
            raise e
        
        return super().handle_data(data)
    