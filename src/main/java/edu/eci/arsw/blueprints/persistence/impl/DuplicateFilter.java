package edu.eci.arsw.blueprints.persistence.impl;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.Filter;


@Service
@Qualifier("DuplicatedFilter")
public class DuplicateFilter implements Filter {
    
    @Override
    public Blueprint applyFilter(Blueprint bp) {
        List<Point> originalPoints = bp.getPoints();
        List<Point> repeatedPoints = new ArrayList<>();
        for (int i = 0; i< originalPoints.size(); i++) {
            for (int j = i+1; j < originalPoints.size(); j++) {
                if (areEquals(originalPoints.get(i),originalPoints.get(j))) {
                    repeatedPoints.add(originalPoints.get(i));
                    break;
                }
            }
        }
        bp.setPoints(removeRepeatedPoints(repeatedPoints, originalPoints));
        return bp;
    }

    @Override
    public Set<Blueprint> multiFilterBlueprint(Set<Blueprint> bps) {
        for (Blueprint blueprint : bps) {
            applyFilter(blueprint);
        }
        return bps;
    }

    public boolean areEquals(Point p1, Point p2) {
        boolean flag = false;
        if (p1.getX() == p2.getX() && p1.getY() == p2.getY()) {
            flag = true;
        }
        return flag;
    }

    public List<Point> removeRepeatedPoints(List<Point> repeatedPoints, List<Point> ptsAll) {
        List<Point> x = new ArrayList<>(ptsAll);
        for (Point repeat : repeatedPoints) {
            x.remove(repeat);
        }
        return x;
    }

}
