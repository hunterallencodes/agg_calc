"""This program is used to inform the user whether or not
the amount of venting is sufficient for the amount of
fixtures in the plumbing system."""

import math

drain = float(input("Enter Required Drain Size: "))
vent_count = int(input("Enter Desired Number of Vents: "))
vent_sizes = []
agg = 0
pi = math.pi
drain_area = round((pi * ((drain / 2) ** 2)), 2)

for num in range(1, vent_count + 1):
        size = float(input(f"Enter Vent Size #{num}: "))
        vent_sizes.append(size)

for vent in vent_sizes:
        x = round((pi * ((vent / 2) ** 2)), 2)
        agg += x

if agg >= drain_area:
        print(f"Sufficient venting provided! Your drain area of \n{drain_area}inches is greater than or equal too \nyour aggregate cross-sectional venting area of {agg}inches. \n:)")
else:
        print(f"Not enough venting provided. Your drain area of \n{drain_area}inches is less than your aggregate \n cross-sectional venting area of {agg}inches. >:(")
